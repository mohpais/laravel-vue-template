<template>
    <div class="container-fluid p-0">
        <!-- <h1 class="h3 mb-3">User List</h1> -->
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header border-bottom d-flex justify-content-between">
                        <div class="title">
                            <h5 class="card-title">User List Table</h5>
                            <h6 class="card-subtitle text-muted fz-13">The following is a list of users in the Hidayah app.</h6>
                        </div>
                        <div class="action my-auto">
                            <button class="btn btn-sm btn-success">
                                <i class="bi bi-plus fz-16 fw-bold"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <data-table
                            :data="dataTable.data"
                            :columns="dataTable.columns"
                            :pagination="dataTable.pagination"
                            @page-change="loadData"
                        />
                        <!-- <MyTable :fields="fields" :data="studentData"></MyTable> -->
                        <!-- <MyTable 
                            defaultSortBy="registered_at"
                            :headers="state.fields"
                            :items="state.values"
                            :filters="filters"
                            :search="true"
                            :actions="actions" /> -->
                            
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Import package */
    import { reactive, defineAsyncComponent, computed, onMounted } from "vue";
    import axios from 'axios';

    /** Import global */
    import { GetUserList } from "@/services"; // Import from Global Packages
    /** Import global */
    import helpers from '@/global/helpers';
    /** Import Component */
    import DataTable from '@/components/organisms/DataTable.vue'; // Adjust the path accordingly
    
    const MyTable = defineAsyncComponent(() =>
        import("@/components/organisms/MyTable.vue")
    );

    /**  Define variables */
    let state = reactive({
        fields: [],
        values: null,
        dataTable: {
            data: [],
            columns: [
                { text: 'ID', value: 'id' },
                { text: 'Full Name', value: 'fullname' },
            // Add more column definitions as needed
            ],
            pagination: {},
        },
    });

    let dataTable = reactive({
        data: [],
        columns: [
            { text: 'ID', value: 'id' },
            { text: 'Full Name', value: 'fullname' },
        // Add more column definitions as needed
        ],
        pagination: {},
    })

    const studentData = [
        { ID:"01", Name: "Abiola Esther", Description:"Computer Science", Date:"2023-12-22 14:57", Age:"17" },
        { ID:"02", Name: "Robert V. Kratz", Description:"Philosophy", Date:"2023-12-22 14:57", Age:'19' },
        { ID:"03", Name: "Kristen Anderson", Description:"Economics", Date:"2022-12-22 14:57", Age:'20' },
        { ID:"04", Name: "Adam Simon", Description:"Food science", Date:"2023-12-22 14:57", Age:'21' },
        { ID:"05", Name: "Daisy Katherine", Description:"Business studies", Date:"2023-12-22 14:57", Age:'22' },   
    ];

    const fields = [
        { key: 'ID', width: '7%', sortable: true },
        { key: 'Name', sortable: true },
        { key: 'Description', sortable: true, shorten: true, restrictToLen: 50 },
        {
          key: 'Date',
          sortable: true,
          defaultSortBy: true,
          defaultOrder: 'DESC'
        },
        { key: 'Age',  sortable: true, dataType: 'float' },
    ];

    const filters = [
        {
          type: 'input-date',
          key: 'Date',
          min: '2017-05-04',
          max: '2019-10-28',
          label: 'Date'
        },
        {
          type: 'select-range',
          key: 'Age',
          defaultOption: '-- Select One --',
          options: [
            { label: '-1000 to -501', value: { min: -1000, max: -501 } },
            { label: '-500 to -1', value: { min: -500, max: -1 } },
            { label: '0 to 499', value: { min: 0, max: 499 } },
            { label: '500 to 1000', value: { min: 500, max: 1000 } }
          ],
          label: 'Age'
        }
    ];

    const updatePayment = () => {
        return 'payments/UPDATE_PAYMENT';
    }

    const actions = [
        {
            type: 'edit',
            key: ['Description'],
            func: updatePayment(),
            icon: 'edit',
            name: 'Edit'
        }
    ];

    onMounted(async () => {
        // await getUserList();
        loadData();
        // console.log(state.fields, state.values);
        // console.log(dataTable.pagination);
    });

    const getUserList = async () => {
        await GetUserList()
            .then(function successCallBack(response) {
                state.values = response.data;
                if (state.values.length > 0) {
                    let itemsKeys = Object.keys(state.values[0]);
                    itemsKeys.forEach((item) => {
                        let newobj = { key: item, sortable: true, visibility: item == 'id' ? false : true };
                        state.fields.push(newobj);
                    })
                };
            })
            .catch(function errorCallBack(err) {
                console.log(err);
            })
    }

    const loadData = (page = 1) => {
        console.log('loadData called with page:', page);

      // Make an Axios request to your Laravel backend
      axios.post('http://127.0.0.1:8000/api/user/list-datatables', { page, length: 1 })
        .then(response => {
            // Update your dataTable with the response
            dataTable.data = response.data.data;
            dataTable.pagination = response.data.pagination;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const userClick = (v)=> {
        console.log('userClick called with value:', v);
    }
</script>