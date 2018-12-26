<template>
  <div class="container-fliud">
    <div class="row">
      <div class="col bg-secondary text-white">
        <a class="navbar-brand">SPORTS STORE admin</a>
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-secondary p-2">
        <router-link to="/admin/products" class="btn btn-block btn-primary navigation-link" active-class="active">
          Products
        </router-link>
        <router-link to="/admin/orders" class="btn btn-block btn-primary navigation-link" active-class="active">
          Orders
        </router-link>
      </div>
      <div class="col-9 p-2">
        <router-view/>
      </div>
    </div>
  </div>
</template>

