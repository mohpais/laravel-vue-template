<template>
    <div class="px-3">
        <div class="row justify-content-between">
            <div class="col-sm-12 px-0 col-md-6 my-auto">
                <div class="d-inline-block fz-12" id="reponsive_length">
                    <label>
                        Show 
                        <select id="length-select" class="form-select form-select-sm d-inline-block" v-model="state.selectedLength" style="width: auto;">
                            <option  v-for="lengthOption in state.lengthOptions" :key="lengthOption" :value="lengthOption">
                                {{ lengthOption }}
                            </option>
                        </select> 
                        Entries
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 px-0 table-responsive">
                <table ref="dataTable" class="table dataTable table-bordered table-striped">
                    <thead>
                        <tr>
                            <th v-if="options.hasOwnProperty('rownumber') && options.rownumber" class="text-center" style="width: 5px;" :class="{
                                'fixed-column-left': props.options.hasOwnProperty('fixedColumns') && props.options.fixedColumns.hasOwnProperty('left')
                            }">#</th>
                            <th 
                                v-for="(column, index) in options.columns" 
                                :key="index" 
                                :style="{ width: column.width }" 
                                @click="handleSort(index)"
                                :class="hasClassHeader(column, index)">
                                    {{ helpers.toTitleCase(column.text ?? column.data)  }}
                            </th>
                            <th v-if="hasActions || (options.hasOwnProperty('action') && options.action)" class="fixed-column-action"></th>
                        </tr>
                        <tr v-if="state.searchable && helpers.hasProperty(options.columns, 'searchable')">
                            <th v-if="options.hasOwnProperty('rownumber') && options.rownumber" :class="{
                                'fixed-column-left': props.options.hasOwnProperty('fixedColumns') && props.options.fixedColumns.hasOwnProperty('left')
                            }"></th>
                            <th
                                v-for="(column, index) in options.columns.filter(column => column.visible === undefined || column.visible === true)" :key="index"
                                :class="hasClassSearch(index)"
                                >
                                <input v-if="column.searchable" type="text" :id="column.data" class="form-control" @change="handleSearch" autocomplete="off" />
                            </th>
                            <th v-if="hasActions || (options.hasOwnProperty('action') && options.action)" class="fixed-column-action"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="state.isLoading">
                            <td :colspan="hasActions || (options.hasOwnProperty('action') && options.action) ? options.columns.length + 1 : options.columns.length" class="text-center py-4">
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-else-if="!state.isLoading && !state.data">
                            <td :colspan="hasActions || (options.hasOwnProperty('action') && options.action) ? options.columns.length + 1 : options.columns.length" class="text-center">
                                <h6>No data entry!</h6>
                            </td>
                        </tr>
                        <tr v-else-if="!state.isLoading && state.data.length > 0" v-for="(item, row) in state.data" :key="row">
                            <td v-if="options.hasOwnProperty('rownumber') && options.rownumber" :class="{
                                'fixed-column-left': props.options.hasOwnProperty('fixedColumns') && props.options.fixedColumns.hasOwnProperty('left')
                            }">{{ startEntry+row }}</td>
                            <td v-for="(column, col) in options.columns" :key="col" :class="hasClassBody(column, item, col)">
                                <!-- Check if the column has a render function -->
                                <template v-if="typeof column.render === 'function'">
                                    <!-- Call the render function with appropriate parameters -->
                                    <div class="w-100" v-html="column.render(item[column.data], 'display', item, { row, col })"></div>
                                </template>
                                <template v-else>
                                    <!-- Display item[column.data] for regular columns -->
                                    {{ item[column.data] ?? '-' }}
                                </template>

                            </td>
                            <td v-if="hasActions || (options.hasOwnProperty('action') && options.action)" class="fixed-column-action bg-white">
                                <div class="btn-group position-relative dropdown">
                                    <button type="button" :id="`dropdown-menu-${row}`" class="btn btn-sm btn-link dropdown-toggle border" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <div 
                                        class="dropdown-menu"  :aria-labelledby="`dropdown-menu-${row}`"
                                    >
                                        <!-- <a type="button" @click="openModal(item)" class="dropdown-item" href="#"><i class="bi bi-pencil-square me-1"></i>Edit</a> -->
                                        <router-link class="dropdown-item" :to="{ path: route.path + `/edit/${item.id}` }">
                                            <i class="bi bi-pencil-square me-1"></i>Edit
                                        </router-link>
                                        <a type="button" @click="deleteData(item)" class="dropdown-item"><i class="bi bi-trash me-1"></i>Delete</a>
                                        <a class="dropdown-item" href="#"><i class="bi bi-link me-1"></i>Detail</a>
                                        <!-- <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Separated link</a> -->
                                    </div>
                                </div>
                                <!-- <a type="button" @click="deleteItem(item)" class=""><i class="bi bi-trash me-1"></i>Delete</a> -->

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row mt-2 justify-content-between">
            <div class="col ps-0 my-auto">
                <span>Showing {{ isNaN(startEntry) ? 0 : startEntry }} to {{ isNaN(endEntry) ? 0 : endEntry }} of {{ isNaN(totalEntries) ? 0 : totalEntries }} entries</span>
            </div>
            <div class="col-auto pe-0">
                <Pagination v-if="!state.isLoading" :pagination="state.pagination" @page-change="loadData" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
    /** Import package */
    import { ref, computed, reactive, getCurrentInstance, watch, onMounted, onUpdated, nextTick, defineAsyncComponent } from "vue";
    import { useRoute } from 'vue-router';
    /** Import component */
    const Pagination = defineAsyncComponent(() =>
        import("@/components/molekuls/Pagination.vue")
    );
    const DataTable = defineAsyncComponent(() =>
        import("@/components/organisms/DataTable.vue")
    );
    const Modal = defineAsyncComponent(() =>
        import("@/components/organisms/Modal.vue")
    );
    /** Import global */
    import helpers from '@/global/helpers';
    /** Import service */
    import { GetListDataTables, DeleteItemOnDataTables } from "@/services"; // Import from Global Packages GetListDataTables
    /** Define props */
    const props = defineProps({
        options: {
            type: Object,
            required: true,
        },
        performAction: {
            type: Function,
            default: () => {},
        }
    });
    /** Define variable */
    let modalDelete = ref(null);
    let route = useRoute();
    let dataTable = ref(null);
    let hasActions = computed(() => {
        const instance = getCurrentInstance();
        return instance.slots.actions !== undefined;
    });

    let state = reactive({
        isLoading: false,
        lengthOptions: props.options.lengthOptions ?? [5, 10, 25, 50, 100],
        selectedLength: props.options.displayLength ?? 5,
        sortOrders: props.options.orders ?? new Array(),
        searchable: props.options.searchable ?? true,
        searchData: computed(() => {
            return props.options.columns
                .filter(obj => obj.hasOwnProperty('searchable'))
                .map(obj => ({ column: props.options.columns.findIndex(x => x.data === obj['data']), value: '' }));
        }), 
        data: null,
        pagination: {},
    });
    let startEntry = computed(() => (state.pagination.currentPage - 1) * state.pagination.perPage + 1);
    let endEntry = computed(() => {
        const lastEntry = startEntry.value + state.pagination.perPage - 1;
        return lastEntry > state.pagination.total ? state.pagination.total : lastEntry;
    });
    let totalEntries = computed(() => state.pagination.total);


    onMounted(async () => {
        await loadData();
    });

    const hasClassHeader = (column, index) => {
        let className = ''
        if (column.hasOwnProperty('visible') && !column.visible) 
            className += 'd-none ';
        if (!column.hasOwnProperty('orderable')) 
            className += 'sorting ';
        if (column.hasOwnProperty('orderable') && !column.orderable) 
            className += 'sorting_disabled ';
        if ((!column.hasOwnProperty('orderable') || (column.hasOwnProperty('orderable') && column.orderable === true)) && getSortIcon(index) === 'asc') 
            className += 'sorting_asc ';
        if ((!column.hasOwnProperty('orderable') || (column.hasOwnProperty('orderable') && column.orderable === true)) && getSortIcon(index) === 'desc') 
            className += 'sorting_desc ';
            // fixed-column
        if (props.options.hasOwnProperty('fixedColumns') && props.options.fixedColumns.hasOwnProperty('left')) {
            let idxFixedLeft = props.options.fixedColumns.left;
            if (index < idxFixedLeft) {
                // className += 'fixed-column-left-header ';
                className += 'fixed-column-left ';
            }
        }
        
        return className;
    }

    const hasClassSearch = (index) => {
        let className = ''
        if (props.options.hasOwnProperty('fixedColumns') && props.options.fixedColumns.hasOwnProperty('left')) {
            let idxFixedLeft = props.options.fixedColumns.left;
            if (index < idxFixedLeft - (props.options.columns.filter(column => column.visible).length + 2)) {
                // className += 'fixed-column-left-header ';
                className += 'fixed-column-left ';
            }
        }
        
        return className;
    }
        
    const hasClassBody = (column, item, index) => {
        let classData = '';
        if (column.hasOwnProperty('className')) {
            classData += column.className + ' ';
        }
        if (column.hasOwnProperty('visible') && !column.visible) {
            classData += 'd-none ';
        } else if (!item[column.data]) {
            classData += 'text-center ';
        }
        if (props.options.hasOwnProperty('fixedColumns') && props.options.fixedColumns.hasOwnProperty('left')) {
            let idxFixedLeft = props.options.fixedColumns.left;
            if (index < idxFixedLeft) {
                // classData += 'fixed-column-left-body ';
                classData += 'fixed-column-left ';
            }
        }
        
        return classData;
    }

    const loadData = async (page = 1) => {
        state.isLoading = true;
        let payload = {
            page, 
            // columns: props.options.columns,
            columns: props.options.columns.map(column => column.data),
            displayLength: state.selectedLength,
            orders: state.sortOrders,
            search: state.searchData
        }
        
        try {
            const response = await GetListDataTables(props.options.api, payload);
            state.data = response.data.data;
            state.pagination = response.data.pagination;
        } catch (error) {
            console.error('Error fetching data:', error);
            helpers.alertToast("error", "Something wrong when load item!");
            state.data = [];
        } finally {
            state.isLoading = false;
        }
    }
        
    const handleSort = async (columnIndex) => {
        let existingOrder = state.sortOrders.find(order => order.column === columnIndex);
        if (existingOrder) {
            const existingOrderIndex = state.sortOrders.findIndex(order => order.column === columnIndex);
            if (existingOrderIndex !== -1) {
                // If the column is already in the sorting orders, remove it
                existingOrder = state.sortOrders.splice(existingOrderIndex, 1)[0];
                existingOrder.dir = existingOrder.dir === 'asc' ? 'desc' : 'asc';
                // Add the existing order to the first index
                state.sortOrders.unshift(existingOrder);
            }
        } else {
            // Use unshift to add the new order to the beginning of the array
            state.sortOrders.unshift({
                column: columnIndex,
                dir: 'asc',
            });
        }
        // Remove any duplicate orders (keep only the last one)
        state.sortOrders = state.sortOrders.filter((order, index, self) =>
            index === self.findIndex(o => o.column === order.column)
        );

        await loadData();
    }
    
    const getSortIcon = (columnIndex) => {
        if (!props.options.orders) return '';
        const order = props.options.orders.find(order => order.column === columnIndex);
        return order ? order.dir : '';
    };

    watch(
        () => state.data,
        (newData) => {
            if (newData) {
                state.isLoading = false;
            }
        },
        { immediate: true }
    );

    onUpdated(() => {
        nextTick(() => {
            if (
                props.options.hasOwnProperty('fixedColumns') && 
                props.options.fixedColumns.hasOwnProperty('left') && 
                props.options.fixedColumns.left > 0
            ) {
                const rows = dataTable.value.querySelectorAll("tr");
                rows.forEach((row) => {
                    const cells = row.querySelectorAll("td.fixed-column-left, th.fixed-column-left");
                    let totalWidth = 0;
                    cells.forEach((cell) => {
                        // console.log(cell.tagName.toLowerCase());
                        cell.style.left = `${totalWidth}px`;
                        totalWidth += cell.offsetWidth;
                        if (cell.tagName.toLowerCase() == 'td') {
                            cell.style.backgroundColor = '#fff';
                        }
                    });
                });
            }
        });
    });

    const emits = defineEmits(["openModal", "deleteData"]);

    const openModal = (item) => {
        // Default action logic
        return emits("openModal", item);
    }

    const deleteData = (item) => {
        // Default action logic
        return emits("deleteData", item);
    }

    const deleteItem = async (item) => {
        // if (item) {
        //     modalDelete.value.show();
        // }
        const isConfirmed = await helpers.confirmDeleteAction();
        if (isConfirmed) {
            try {
                let url = route.path + `delete`;
                let params = {params: { id: item.id }};
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
</script>
  
<style lang="scss" scoped>
    @mixin font($size, $color, $weight) {
        font-size: $size;
        color: $color;
        font-weight: $weight;
    }

    $mobileFilterFont: 16px;
    .dataTable {
        white-space: nowrap;
        font-size: 12px;
        thead {
            tr {
                th {
                    background-color: #eeeeee;
                    .sorting {
                        cursor: pointer;
                        padding-right: 26px;
                        position: relative;
                    }
                }
            }
        };
        .fixed-column-left {
            border-right: 1px solid #dee2e6 !important;
            border-left: 1px solid #dee2e6 !important;
            position: sticky;
            z-index: 1;
            :last-child {
                // box-shadow: 2px 4px #dee2e6;;
            }
            // background-color: #fff;
        }

        .fixed-column-action {
            border-left: 1px solid #dee2e6;
            position: sticky;
            right: 0;
            z-index: 1;
            top: 0;
        }

        .fixed-column-action .dropdown-menu.show {
            z-index: 1000; /* Adjust the value as needed */
            right: 50px !important;
            top: -28px !important;
        }
    }
</style>