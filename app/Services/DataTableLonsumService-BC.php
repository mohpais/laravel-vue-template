<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class DataTableLonsumServiceBC
{
    public function getJsonResponse(Builder $query, Request $request)
    {
        // Clone the original query to get total records count
        $totalRecordsQuery = clone $query;
        $totalRecords = $totalRecordsQuery->count();

        // Apply searching if any
        $searchConditions = $request->input('filter', []);
        if (count($searchConditions) > 0) {
            foreach ($searchConditions as $searchCondition) {
                $column = $searchCondition['column']; // Assuming this is the column name
                $operator = $searchCondition['operator'] ?? "="; // Assuming this is the operator
                $value = $searchCondition['value'];
        
                $this->applySearch($query, $column, $operator, $value);
            }
        }

        // Get the total count after applying searching
        $totalFiltered = $query->count();

        // Apply ordering
        $this->applyOrdering($query, $request);

        // Apply pagination
        $perPage = $request->input('limit', 10);
        $currentPage = ceil(($request->input('page') - 1) / $perPage + 1); // Corrected calculation

        $data = $query->paginate($perPage, ['*'], 'page', $currentPage);

        return [
            // 'totalRecord' => $totalFiltered,
            'data' => $data->items(),
            'pagination' => [
                'currentPage' => $data->currentPage(),
                'perPage' => $data->perPage(),
                'lastPage' => $data->lastPage(),
                'totalRecord' => $data->total(),
            ],
        ];
    }

    protected function applySearch(Builder $query, $field, $operator, $value)
    {
        if ($field && $value) {
            switch ($operator) {
                case '=':
                case '<>':
                case '<':
                case '<=':
                case '>':
                case '>=':
                    $query->where($field, $operator, $value);
                    break;
                case 'like':
                    $query->where($field, 'like', '%' . $value . '%');
                    break;
                default:
                    // Handle other operators as needed
                    $query->where($field, $value);
                    break;
            }
        }
    }

    protected function applyOrdering(Builder $query, Request $request)
    {
        if ($request->has('orders')) {
            $orders = $request->input('orders');

            foreach ($orders as $order) {
                $orderColumn = $order['sortBy'];
                $orderDirection = $order['sortType'];

                $query->orderBy($orderColumn, $orderDirection);
            }
        }
    }
}
