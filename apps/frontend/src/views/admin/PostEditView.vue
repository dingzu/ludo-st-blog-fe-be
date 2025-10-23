<template>
  <div class="post-edit-view">
    <h2>{{ isEdit ? '编辑文章' : '新建文章' }}</h2>
    <form class="post-form">
      <div class="form-group">
        <label>标题</label>
        <input type="text" v-model="post.title" placeholder="请输入文章标题" />
      </div>
      <div class="form-group">
        <label>内容</label>
        <textarea v-model="post.content" rows="10" placeholder="请输入文章内容"></textarea>
      </div>
      <div class="form-actions">
        <button type="button" @click="savePost" class="btn-primary">保存</button>
        <router-link to="/admin/posts" class="btn-secondary">取消</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isEdit = computed(() => !!route.params.id)

const post = ref({
  title: '',
  content: ''
})

const savePost = () => {
  console.log('保存文章:', post.value)
  // 这里将实现保存逻辑
}
</script>

<style scoped>
.post-edit-view {
  padding: 20px;
}

.post-form {
  max-width: 800px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
}
</style>
