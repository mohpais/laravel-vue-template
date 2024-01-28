<template>
    <div class="container-fluid p-0">
        <div class="row mb-2 mb-xl-3">
            <div class="col-auto d-none d-sm-block">
                <h3><strong>Analytics</strong> Dashboard</h3>
            </div>

            <div class="col-auto ms-auto text-end mt-n1">
                <a href="#" class="btn btn-light bg-white me-2">Invite a Friend</a>
                <a href="#" class="btn btn-primary">New Project</a>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-xxl-5 d-flex">
                <div class="w-100">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col mt-0">
                                            <h5 class="card-title">Sales</h5>
                                        </div>

                                        <div class="col-auto">
                                            <div class="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck align-middle"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 class="mt-1 mb-3">2.382</h1>
                                    <div class="mb-0">
                                        <span class="badge badge-primary-light"> <i class="mdi mdi-arrow-bottom-right"></i> -3.65% </span>
                                        <span class="text-muted">Since last week</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col mt-0">
                                            <h5 class="card-title">Visitors</h5>
                                        </div>

                                        <div class="col-auto">
                                            <div class="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users align-middle"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 class="mt-1 mb-3">14.212</h1>
                                    <div class="mb-0">
                                        <span class="badge badge-success-light"> <i class="mdi mdi-arrow-bottom-right"></i> 5.25% </span>
                                        <span class="text-muted">Since last week</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col mt-0">
                                            <h5 class="card-title">Earnings</h5>
                                        </div>

                                        <div class="col-auto">
                                            <div class="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign align-middle"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 class="mt-1 mb-3">$21.300</h1>
                                    <div class="mb-0">
                                        <span class="badge badge-success-light"> <i class="mdi mdi-arrow-bottom-right"></i> 6.65% </span>
                                        <span class="text-muted">Since last week</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col mt-0">
                                            <h5 class="card-title">Orders</h5>
                                        </div>

                                        <div class="col-auto">
                                            <div class="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart align-middle"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 class="mt-1 mb-3">64</h1>
                                    <div class="mb-0">
                                        <span class="badge badge-danger-light"> <i class="mdi mdi-arrow-bottom-right"></i> -2.25% </span>
                                        <span class="text-muted">Since last week</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-6 col-xxl-7">
                <div class="card flex-fill w-100">
                    <div class="card-header">
                        <div class="float-end">
                            <form class="row g-2">
                                <div class="col-auto">
                                    <select class="form-select form-select-sm bg-light border-0">
                                        <option>Jan</option>
                                        <option value="1">Feb</option>
                                        <option value="2">Mar</option>
                                        <option value="3">Apr</option>
                                    </select>
                                </div>
                                <div class="col-auto">
                                    <input type="text" class="form-control form-control-sm bg-light rounded-2 border-0" style="width: 100px;" placeholder="Search..">
                                </div>
                            </form>
                        </div>
                        <h5 class="card-title mb-0">Recent Movement</h5>
                    </div>
                    <div class="card-body pt-2 pb-3">
                        <div class="chart chart-sm"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                            <canvas id="chartjs-dashboard-line" style="display: block; height: 250px; width: 400px;" width="600" height="375" class="chartjs-render-monitor"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12d-flex">
                <div class="card flex-fill">
                    <div class="card-header">
                        <div class="card-actions float-end">
                            <div class="dropdown position-relative">
                                <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                </a>

                                <div class="dropdown-menu dropdown-menu-end">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <h5 class="card-title mb-0">Latest Projects</h5>
                    </div>
                    <table class="table table-borderless my-0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th class="d-none d-xxl-table-cell">Company</th>
                                <th class="d-none d-xl-table-cell">Author</th>
                                <th>Status</th>
                                <th class="d-none d-xl-table-cell">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-light rounded-2">
                                                <img class="p-2" src="img/icons/brand-1.svg">
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <strong>Project Apollo</strong>
                                            <div class="text-muted">
                                                Web, UI/UX Design
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xxl-table-cell">
                                    <strong>Lechters</strong>
                                    <div class="text-muted">
                                        Real Estate
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <strong>Vanessa Tucker</strong>
                                    <div class="text-muted">
                                        HTML, JS, React
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column w-100">
                                        <span class="me-2 mb-1 text-muted">65%</span>
                                        <div class="progress progress-sm bg-success-light w-100">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: 65%;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <a href="#" class="btn btn-light">View</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-light rounded-2">
                                                <img class="p-2" src="img/icons/brand-2.svg">
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <strong>Project Bongo</strong>
                                            <div class="text-muted">
                                                Web
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xxl-table-cell">
                                    <strong>Cellophane Transportation</strong>
                                    <div class="text-muted">
                                        Transportation
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <strong>William Harris</strong>
                                    <div class="text-muted">
                                        HTML, JS, Vue
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column w-100">
                                        <span class="me-2 mb-1 text-muted">33%</span>
                                        <div class="progress progress-sm bg-danger-light w-100">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 33%;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <a href="#" class="btn btn-light">View</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-light rounded-2">
                                                <img class="p-2" src="img/icons/brand-3.svg">
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <strong>Project Canary</strong>
                                            <div class="text-muted">
                                                Web, UI/UX Design
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xxl-table-cell">
                                    <strong>Clemens</strong>
                                    <div class="text-muted">
                                        Insurance
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <strong>Sharon Lessman</strong>
                                    <div class="text-muted">
                                        HTML, JS, Laravel
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column w-100">
                                        <span class="me-2 mb-1 text-muted">50%</span>
                                        <div class="progress progress-sm bg-warning-light w-100">
                                            <div class="progress-bar bg-warning" role="progressbar" style="width: 50%;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <a href="#" class="btn btn-light">View</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-light rounded-2">
                                                <img class="p-2" src="img/icons/brand-4.svg">
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <strong>Project Edison</strong>
                                            <div class="text-muted">
                                                UI/UX Design
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xxl-table-cell">
                                    <strong>Affinity Investment Group</strong>
                                    <div class="text-muted">
                                        Finance
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <strong>Vanessa Tucker</strong>
                                    <div class="text-muted">
                                        HTML, JS, React
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column w-100">
                                        <span class="me-2 mb-1 text-muted">80%</span>
                                        <div class="progress progress-sm bg-success-light w-100">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: 80%;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <a href="#" class="btn btn-light">View</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-light rounded-2">
                                                <img class="p-2" src="img/icons/brand-5.svg">
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <strong>Project Indigo</strong>
                                            <div class="text-muted">
                                                Web, UI/UX Design
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xxl-table-cell">
                                    <strong>Konsili</strong>
                                    <div class="text-muted">
                                        Retail
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <strong>Christina Mason</strong>
                                    <div class="text-muted">
                                        HTML, JS, Vue
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column w-100">
                                        <span class="me-2 mb-1 text-muted">78%</span>
                                        <div class="progress progress-sm bg-primary-light w-100">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: 78%;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="d-none d-xl-table-cell">
                                    <a href="#" class="btn btn-light">View</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        </div>
</template>