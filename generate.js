import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// submenuItems 数据
const submenuItems = [
    { label: '天际线查询算法（非分布式）', path: 'skylineQueryAlgorithm' },
    { label: '相似性查询算法（非分布式）', path: 'similarityQueryAlgorithm' },
    { label: '反向相似性查询算法（非分布式）', path: 'reverseSimilarityQueryAlgorithm' },
    { label: '关键字查询算法（非分布式）', path: 'keywordQueryAlgorithm' },
    { label: '范围查询算法（非分布式）', path: 'rangeQueryAlgorithm' }
];

// 目标目录，存放所有.vue文件
const targetDir = 'src/views/NonDistributedView'

// 确保目标目录存在
if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
}

// 为每个子菜单项创建一个 .vue 文件
submenuItems.forEach((item) => {
    const fileName = `${item.path.charAt(0).toUpperCase() + item.path.slice(1)}.vue`; // 使用首字母大写命名
    const filePath = join(targetDir, fileName);

    const content = `
<template>
  <div>
    <h1>${item.label}</h1>
    <!-- 这里可以放对应的页面内容 -->
  </div>
</template>

<script>
export default {
  name: '${item.path.charAt(0).toUpperCase() + item.path.slice(1)}Page',
};
</script>

<style scoped>
/* 页面样式 */
</style>
`;

    // 写入文件
    writeFileSync(filePath, content, 'utf-8');
    console.log(`文件已创建: ${filePath}`);
});
