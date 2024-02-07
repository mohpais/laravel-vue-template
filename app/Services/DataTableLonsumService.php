<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataTableLonsumService
{
    private static $query;
    private static $params;

    public static function query($query, $params = null) {
        self::$query  = $query;
        self::$params = $params;
    }

    private function processQuery() {
        // SQL query as a string
        $subquery = DB::raw("($query) AS sub");

        if (is_null($params)) {
            $data = DB::table($subquery);
        } else {

        }
        
        // Count the data returned by the subquery
        $totalRecordsQuery = DB::table($subquery)->count();
    }

    // public function getJsonResponse(Request $request, $query, $bindings = null)
    // {
    //     // Clone the original query to get total records count
    //     $totalRecordsQuery = DB::table(DB::raw("($query) as sub"));
    //     $totalRecords = $totalRecordsQuery->count();

    //     // Apply searching if any
    //     // $searchConditions = $request->input('filter', []);
    //     // if (count($searchConditions) > 0) {
    //     //     foreach ($searchConditions as $searchCondition) {
    //     //         $column = $searchCondition['column']; // Assuming this is the column name
    //     //         $operator = $searchCondition['operator'] ?? "="; // Assuming this is the operator
    //     //         $value = $searchCondition['value'];
        
    //     //         $this->applySearch($query, $column, $operator, $value);
    //     //     }
    //     // }

    //     // Get the total count after applying searching
    //     $totalFiltered = DB::table(DB::raw("($query) as sub"))->count();

    //     // Apply ordering
    //     // $this->applyOrdering($query, $request);

    //     // Apply pagination
    //     $perPage = $request->input('limit', 10);
    //     $currentPage = ceil(($request->input('page') - 1) / $perPage + 1); // Corrected calculation

    //     // Execute the query with bindings if they exist
    //     if (!is_null($bindings)) {
    //         $data = DB::select($this->addLimitOffset($query, $perPage, $currentPage), $bindings);
    //     } else {
    //         $data = DB::select($this->addLimitOffset($query, $perPage, $currentPage));
    //     }
    //     $data = DB::select($this->addLimitOffset($query, $perPage, $currentPage));

    //     // Convert the data to array
    //     $dataArray = array_map(function ($item) {
    //         return (array) $item;
    //     }, $data);

    //     return [
    //         // 'totalRecord' => $totalFiltered,
    //         'recordsTotal' => $totalRecords,
    //         'recordsFiltered' => $totalFiltered,
    //         'data' => $dataArray,
    //         'pagination' => [
    //             'currentPage' => $currentPage,
    //             'perPage' => $perPage,
    //             'lastPage' => ceil($totalFiltered / $perPage),
    //             'totalRecord' => $totalFiltered,
    //         ],
    //     ];
    // }

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

    protected function addLimitOffset($query, $perPage, $currentPage)
    {
        return "$query LIMIT $perPage OFFSET " . (($currentPage - 1) * $perPage);
    }
}
