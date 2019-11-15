<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card" v-role="'user'">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        <button v-can:disabled="'click yeah'">Yeah!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        async created() {
            const permissionsRequest = axios.get('/api/permissions');
            const rolesRequest = axios.get('/api/roles');

            const { data: permissions } = await permissionsRequest;
            const { data: roles } = await rolesRequest;

            this.$laravel.setPermissions(permissions);
            this.$laravel.setRoles(roles);
        }
    }
</script>
