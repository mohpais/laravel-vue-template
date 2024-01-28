<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header border-bottom d-flex justify-content-between">
                        <div class="title">
                            <h5 class="card-title">User List</h5>
                            <h6 class="card-subtitle text-muted fz-13">The following is a list of users in the TNovel App.</h6>
                        </div>
                        <div class="action my-auto">
                            <!-- <button class="btn btn-sm btn-success" @click="openModal()">
                                <i class="bi bi-plus fz-16 fw-bold"></i>
                            </button> -->
                            <router-link class="btn btn-sm btn-success" :to="{ name: 'UserAdd'}"><i class="bi bi-plus fz-16 fw-bold"></i></router-link>
                        </div>
                    </div>
                    <div class="card-body">
                        <data-table :options="state.dataTable" @openModal="openModal" @deleteData="handleDelete">
                             <!-- Custom actions for each row -->
                             <!-- <template #actions="{ item }">
                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>
    
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </template> -->
                            <!-- <template #actions="{ item }">
                                <button class="btn btn-sm btn-info me-1" @click.prevent="openModal(item)"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-sm btn-danger" @click="deleteUser(item)"><i class="bi bi-trash"></i></button>
                            </template> -->
                        </data-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal edit -->
    <!-- <Modal id="modal-edit" title="Edit User" ref="modalEdit">
        <template #body>
            <MyFormProvider id="formEdit" :formData="editUserForm" @onSubmit="onSubmit">
                <FormControl
                    id="fullname"
                    labelName="Full Name"
                    placeholder="Enter your full name ..."
                    v-model="editUserForm.fullname"
                    :required="true"
                />
                <hr />
                <button type="submit" class="btn btn-warning">Edit</button>
            </MyFormProvider>
        </template>
    </Modal> -->
</template>

<script setup>
    /** Import package */
    import { ref, reactive, defineAsyncComponent } from "vue";
    /** Import global */
    import helpers from '@/global/helpers';
    import { DeleteItemOnDataTables } from "@/services"; // Import from Global Packages GetListDataTables
    /** Import Component */
    const DataTable = defineAsyncComponent(() =>
        import("@/components/organisms/DataTable.vue")
    );
    const Modal = defineAsyncComponent(() =>
        import("@/components/organisms/Modal.vue")
    );
    const MyFormProvider = defineAsyncComponent(() =>
        import("@/components/organisms/MyFormProvider.vue")
    );
    const FormControl = defineAsyncComponent(() =>
        import("@/components/molekuls/FormControl.vue")
    );
    import profileImg from '@/assets/images/avatar-4.jpg';
    

    /**  Define variables */
    let modalEdit = ref(null);
    let state = reactive({
        dataTable: {
            api: 'user/list-datatables',
            fixedColumns: {
                left: 3
            },
            columns: [
                { data: 'id', visible: false },
                { 
                    text: 'Profile', 
                    data: 'photo_profile', 
                    orderable: false, 
                    render:  function ( data, type, row, meta ) {
                        // console.log(data, type, row, meta);
                        let roledata = row.roles.map(obj => obj.name).join(', ');

                        let img = `<img src="${profileImg}" width="32" height="32" class="rounded-circle" alt="Avatar">`;
                        let usr = `<div class="ms-2 d-flex flex-column"><span class="fw-bold">${row.fullname}</span><span class="text-muted fz-10">${roledata}</span></div>`;
                        let rn = `<div class="d-flex">${img}${usr}</div>`;
                        // return `<img src="${profileImg}" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`;
                        return rn;
                    },
                },
                { text: 'Name', data: 'fullname', visible: false, searchable: true },
                { data: 'username' },
                { data: 'email', searchable: true },
                { data: 'birthday', orderable: false },
                { 
                    data: 'gender', 
                    orderable: false, 
                    render:  function ( data, type, row, meta ) {
                        // console.log(data, type, row, meta);
                        return `<span class="badge bg-success">${data}</span>`;
                    },
                    // render: function ( data, type, row, meta ) {
                    //     return type === 'display' && data.length > 40 ?
                    //         '<span title="'+data+'">'+data.substr( 0, 38 )+'...</span>' :
                    //         data;
                    // }
                },
                {
                    data: 'status', 
                    orderable: false,
                    render: function (data, type, row, meta) {
                        // let switchButton = `<div class="form-check form-switch">
                        //     <input class="form-check-input" type="checkbox" id="status-id-${row.id}" ${data ? 'checked' : ''}>
                        //     </div>`
                        // let div = `<div class="d-flex justify-content-center">${switchButton}</div>`
                        let div = `<span class="badge badge-${data ? 'success' : 'danger'}-light">${data ? 'Active' : 'Non Active'}</span>`
                        return div;
                    }
                },
                { 
                    data: 'created_at', 
                    render:  function ( data, type, row, meta ) {
                        // console.log(data, type, row, meta);
                        return `<span class="">${helpers.formatDate(data, 'dateTime')}</span>`;
                    },
                },
                { data: 'roles', visible: false },
                // Add more column definitions as needed
            ],
            orders: [
                {
                    column: 8,
                    dir: "desc"
                }
            ],
            action: true,
            rownumber: true,
            searchable: true
        }
    });
    let editUserForm = reactive({
        fullname: '',
        email: '',
        username: '',
        birthday: ''
    });

    /** Define method */
    const openModal = (item) => {
        // Default action logic
        if (item) {
            // editUserForm.forEach((key, value) => {
            //     console.log(key, value);
            // });
            // editUserForm = item;
            // console.log(editUserForm);
            // modalEdit.value.show();
            // console.log(editUserForm);
            // return modalEdit.value.show();
        }

        // return modalAdd.value.show();
    }

    const handleEdit = () => {
        console.log(editUserForm);
        // formProvider.value.onSubmit();
    }

    const handleDelete = async (item) => {
        const isConfirmed = await helpers.confirmDeleteAction();
        if (isConfirmed) {
            try {
                let url = `user/delete`;
                let params = { id: item.id };
                const response = await DeleteItemOnDataTables(url, params);
                var { success, message } = response.data;
                if (success) {
                    helpers.alertToast("success", message);
                }
            } catch (error) {
                helpers.alertToast("error", "Something wrong when delete item!");
            }
        }
    }

    const onSubmit = async (isValid) => {
        // state.isLoading = true;
        console.log('here', isValid);
        // if (isValid) {
        // }
    }

    const deleteUser = async (item) => {
        // console.log('Default action for item:', item);
        let msg = `Are you sure you want to delete this user? (${item.fullname})`;
        const isConfirmed = await helpers.confirmDeleteAction(msg);
        if (isConfirmed) {
            console.log('Delete action for item:', item);
        }
    }
</script>