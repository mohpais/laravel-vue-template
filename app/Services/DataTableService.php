<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class DataTableService
{
    public function getJsonResponse(Builder $query, Request $request)
    {
        // Clone the original query to get total records count
        $totalRecordsQuery = clone $query;
        $totalRecords = $totalRecordsQuery->count();

        // Apply searching if any
        $this->applySearch($query, $request);

        // Get the total count after applying searching
        $totalFiltered = $query->count();

        // Apply ordering
        $this->applyOrdering($query, $request);

        // Apply pagination
        $perPage = $request->input('displayLength', 10);
        // $currentPage = ($request->input('page') - 1) / $perPage + 1;
        $currentPage = ceil(($request->input('page') - 1) / $perPage + 1); // Corrected calculation
        // dd($currentPage);

        $data = $query->paginate($perPage, ['*'], 'page', $currentPage);

        // Extract the columns from the payload
        // $requestedColumns = collect($request->input('columns'))->pluck('data')->toArray();
        $requestedColumns = $request->input('columns');

        // Filter the data to keep only the requested columns
        $filteredData = $data->map(function ($item) use ($requestedColumns) {
            return collect($item)->only($requestedColumns)->toArray();
        });

        return [
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $totalFiltered,
            'data' => $filteredData->toArray(),
            'pagination' => [
                'currentPage' => $data->currentPage(),
                'perPage' => $data->perPage(),
                'lastPage' => $data->lastPage(),
                'total' => $data->total(),
            ],
        ];

        // return [
        //     'recordsTotal' => $totalRecords,
        //     'recordsFiltered' => $totalFiltered,
        //     'data' => $data->items(),
        //     'pagination' => [
        //         'currentPage' => $data->currentPage(),
        //         'perPage' => $data->perPage(),
        //         'lastPage' => $data->lastPage(),
        //         'total' => $data->total(),
        //     ],
        // ];
    }

    protected function applySearch(Builder $query, Request $request)
    {
        // if ($request->has('columns')) {
        //     $columns = $request->input('columns');
    
        //     // Loop through each column in the payload
        //     foreach ($columns as $column) {
        //         if (isset($column['searchable']) && !$column['searchable']) continue;

        //         if (isset($column['search']['value']) && $column['search']['value'] !== '') {
        //             $searchValue = $column['search']['value'];
    
        //             // Apply the search condition to the specified column
        //             $query->orWhere($column['data'], 'like', '%' . $searchValue . '%');
        //             // // Use where instead of orWhere for the first condition
        //             // $query->where(function ($query) use ($column, $searchValue) {
        //             //     $query->where($column['data'], 'like', '%' . $searchValue . '%');
        //             // });
        //         }
        //     }
        // }
        if ($request->has('search')) {
            $searchConditions = $request->input('search');
            if (is_string($request->has('search'))) {
                $column = $request->input('columns');
            } else {
                foreach ($searchConditions as $searchCondition) {
                    $columnIndex = $searchCondition['column']; // Adjust to zero-based index
                    $searchValue = $searchCondition['value'];
    
                    if ($columnIndex >= 0 && $columnIndex < count($request->input('columns'))) {
                        // $column = $request->input('columns')[$columnIndex];
    
                        // // Apply the search condition to the specified column
                        // $query->orWhere($column, 'like', '%' . $searchValue . '%');
                        $columns = $request->input('columns');

                        // Apply the search condition to the specified column
                        $query->orWhere(function ($query) use ($columns, $columnIndex, $searchValue) {
                            foreach ($columns as $i => $column) {
                                if ($i === $columnIndex) {
                                    $query->where($column, 'like', '%' . $searchValue . '%');
                                }
                            }
                        });
                    }
                }
            }
        }
    }

    protected function applyOrdering(Builder $query, Request $request)
    {
        if ($request->has('orders')) {
            $orders = $request->input('orders');

            foreach ($orders as $order) {
                $orderColumnIndex = $order['column'];
                $orderColumn = $request->input('columns')[$orderColumnIndex];
                $orderDirection = $order['dir'];

                $query->orderBy($orderColumn, $orderDirection);
            }
            // $orderColumn = $request->input('columns')[$request->input('orders.0.column')]['data'];
            // $orderDirection = $request->input('orders.0.dir');
            // $query->orderBy($orderColumn, $orderDirection);
        }
    }
}
