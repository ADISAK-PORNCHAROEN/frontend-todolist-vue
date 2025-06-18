<script setup lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";
import { useTodoStore } from "@/stores/todos";
import type { ITodos } from "@/types/ITodo";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@/composables/useNotification";

const todoStore = useTodoStore();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const formEditData = reactive<ITodos>({
  id: route.params.id as string,
  todo: "",
  status: "",
});
const { showNotification } = useNotification();

const handleEdit = async () => {
  try {
    await todoStore.updateTodo(formEditData);
    showNotification("success", {
      message: "Edit Success",
      description: "Success edit todo",
    });
    router.push("/");
  } catch (e) {
    showNotification("error", {
      message: "Edit Failed",
      description: `${e}`,
    });
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    await todoStore.loadTodo(route.params.id as string);
    formEditData.todo = todoStore.selectTodo.todo;
    formEditData.status = todoStore.selectTodo.status;
  } catch (e) {
    showNotification("error", {
      message: "Failed fetching todo",
      description: `${e}`,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="todoList flex justify-center items-center mt-8 px-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
      <a-skeleton active :loading="isLoading">
        <!-- Breadcrumb with improved styling -->
        <div class="mb-6">
          <a-breadcrumb class="text-sm">
            <a-breadcrumb-item href="" @click="router.push('/')">
              <span class="flex items-center">
                <home-outlined
                  class="text-lg mr-1"
                  style="
                    font-size: 18px;
                    display: inline-flex;
                    align-items: center;
                  "
                />
              </span>
            </a-breadcrumb-item>
            <a-breadcrumb-item class="font-medium text-gray-700">
              {{ todoStore.selectTodo.todo }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <!-- Todo Input Section -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Todo
          </label>
          <a-input
            type="text"
            v-model:value="formEditData.todo"
            placeholder="Enter your todo"
            class="w-full"
            size="large"
          />
        </div>

        <!-- Status Select Section -->
        <div class="mb-8">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Status
          </label>
          <a-select
            ref="select"
            v-model:value="formEditData.status"
            :options="
              todoStore.statuses.map((status) => ({
                value: status,
                label: status,
              }))
            "
            class="w-full"
            size="large"
            placeholder="Select status"
          />
        </div>

        <!-- Update Button -->
        <div class="mt-8">
          <a-button
            type=""
            @click="handleEdit()"
            class="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 text-white w-full h-12 text-base font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            size="large"
          >
            UPDATE
          </a-button>
        </div>
      </a-skeleton>
    </div>
  </div>
</template>
