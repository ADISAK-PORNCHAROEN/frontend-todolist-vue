<script setup lang="ts">
import { useNotification } from "@/composables/useNotification";
import { useTodoStore } from "@/stores/todos";
import type { ITodos } from "@/types/ITodo";
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const todoStore = useTodoStore();
const router = useRouter();

const isLoading = ref<Boolean>(true);
const formData = reactive<ITodos>({
  todo: "",
  status: "Pending",
});
const { showNotification } = useNotification();
const activeKey = ref<String>(todoStore.statuses[0]);
const tabList = [
  { key: "Pending", label: "Pending" },
  { key: "Doing", label: "Doing" },
  { key: "Done", label: "Done" },
];

const filterTodo = computed(() => {
  return todoStore.todoList.filter((todo) => todo.status === activeKey.value);
});

const handleSumbit = async () => {
  if (!formData.todo.trim()) {
    showNotification("error", {
      message: "Error Adding Todo",
      description: "Todo cannot be empty",
    });
    return;
  }
  try {
    await todoStore.addTodo(formData);
    await todoStore.loadTodos();
    formData.todo = "";
    showNotification("success", {
      message: "Add Todo Success",
      description: "Success add todo",
    });
  } catch (e) {
    showNotification("error", {
      message: "Submit Failed",
      description: `${e}`,
    });
  }
};

const handleDelete = async (id: string) => {
  try {
    await todoStore.deleteTodo(id);
    await todoStore.loadTodos();
    showNotification("success", {
      message: "Delete Success",
      description: "Success delete todo",
    });
  } catch (e) {
    showNotification("error", {
      message: "Delete Failed",
      description: `${e}`,
    });
  }
};

const handleEdit = (id: string) => {
  router.push(`/edit/${id}`);
};

const handleChangeStatus = async (event: any, payload: ITodos) => {
  try {
    if (event.target.checked) {
      const result = {
        ...payload,
        status: "Done",
      };
      await todoStore.updateTodo(result);
      await todoStore.loadTodos();
      showNotification("success", {
        message: "Change Success",
        description: "Success change todo status",
      });
    } else {
      const result = {
        ...payload,
        status: "Pending",
      };
      await todoStore.updateTodo(result);
      await todoStore.loadTodos();
      showNotification("success", {
        message: "Change Success",
        description: "Success change todo status",
      });
    }
  } catch (e) {
    showNotification("error", {
      message: "Change Failed",
      description: `${e}`,
    });
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    await todoStore.loadTodos();
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
  <div>
    <!-- Search Input -->
    <div class="flex justify-center items-center mt-8">
      <div class="w-full max-w-xl flex">
        <a-input
          type="text"
          v-model:value="formData.todo"
          placeholder="Enter your todo"
          class="flex-1"
        />
        <a-button
          type=""
          @click="handleSumbit()"
          class="bg-emerald-400 hover:bg-emerald-500 text-white"
        >
          Submit
        </a-button>
      </div>
    </div>

    <!-- Todo List -->
    <div class="todoList flex justify-center items-center mt-8">
      <div class="bg-white rounded-xl shadow-md p-6 w-full max-w-xl max-h-[500px] overflow-auto">
        <!-- Tabs -->
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane v-for="tab in tabList" :key="tab.key" :tab="tab.label">
            <!-- Todo List -->
            <ul class="space-y-4">
              <li
                v-for="todo in filterTodo"
                :key="todo.id"
                class="flex items-center justify-between bg-slate-50 hover:bg-slate-100 px-4 py-3 rounded-lg transition"
              >
                <div class="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    class="w-5 h-5 text-emerald-500"
                    :checked="todo.status === todoStore.statuses[2]"
                    @change="handleChangeStatus($event, todo)"
                  />
                  <span :class="todo.status === todoStore.statuses[2] ? 'line-through' : '' "
                    >{{ todo.todo }}
                  </span>
                </div>
                <!-- Edit and Delete Btn -->
                <div class="flex space-x-2">
                  <a-button
                    type=""
                    class="bg-emerald-400 hover:bg-emerald-500 text-white px-3 py-1 rounded-md"
                    @click="handleEdit(todo.id!)"
                  >
                    Edit
                  </a-button>
                  <a-button
                    type=""
                    class="bg-rose-400 hover:bg-rose-500 text-white px-3 py-1 rounded-md"
                    @click="handleDelete(todo?.id!)"
                  >
                    Delete
                  </a-button>
                </div>
              </li>
            </ul>
          </a-tab-pane>
        </a-tabs>

        <a-skeleton active :loading="isLoading"> </a-skeleton>
      </div>
    </div>
  </div>
</template>
