<template>
  <div class="sub-navigation">
    <h3 class="sub-nav-title">文章分组</h3>
    <ul class="sub-nav-list">
      <li
        v-for="group in groups"
        :key="group.id"
        :class="{ active: activeGroup === group.id }"
        @click="$emit('select-group', group.id)"
      >
        <span class="group-icon">{{ group.icon }}</span>
        <span class="group-label">{{ group.label }}</span>
        <span class="group-count">({{ group.count }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Group {
  id: string
  label: string
  icon: string
  count: number
}

defineProps<{
  groups: Group[]
  activeGroup: string | null
}>()

defineEmits<{
  'select-group': [groupId: string]
}>()
</script>

<style scoped lang="scss">
.sub-navigation {
  padding: 20px 0;
  
  .sub-nav-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 20px;
    margin-bottom: 15px;
    transition: color 0.3s ease;
  }
  
  .sub-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      cursor: pointer;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      color: var(--text-primary);
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--bg-hover);
        border-left-color: var(--border-color);
      }
      
      &.active {
        background: var(--bg-hover);
        border-left-color: var(--primary);
        color: var(--primary);
        font-weight: 600;
      }
      
      .group-icon {
        font-size: 18px;
      }
      
      .group-label {
        flex: 1;
        font-size: 14px;
      }
      
      .group-count {
        font-size: 12px;
        opacity: 0.7;
      }
    }
  }
}
</style>
