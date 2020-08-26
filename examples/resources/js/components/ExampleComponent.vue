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
            const { data: roles } = await axios.get('/api/roles');
            const { data: permissions } = await axios.get('/api/permissions');

            this.$gates.setRoles(roles);
            this.$gates.setPermissions(permissions);
        }
    }
</script>
