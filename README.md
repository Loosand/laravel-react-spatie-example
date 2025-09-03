# Laravel React Spatie TypeScript Transformer Example

这是一个使用 Laravel + React + Inertia.js 构建的 Todo 应用示例，展示了如何使用 Spatie 的强类型 Data 类和 TypeScript Transformer 实现端到端的类型安全。

## 功能特性

- ✅ Laravel 后端 API
- ✅ React + TypeScript 前端
- ✅ Inertia.js 全栈框架
- ✅ Spatie Laravel Data 强类型数据类
- ✅ TypeScript Transformer 自动类型生成

## 技术栈

- **后端**: Laravel 12, PHP 8.2+
- **前端**: React 18, TypeScript, Tailwind CSS
- **数据库**: SQLite (默认)
- **构建工具**: Vite
- **包管理**: Composer (PHP), npm/pnpm (Node.js)

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/Loosand/laravel-react-spatie-example
cd laravel-react-spatie-example
```

### 2. 安装 PHP 依赖

```bash
composer install
```

### 3. 安装 Node.js 依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm (推荐)
pnpm install
```

### 4. 环境配置

```bash
# 复制环境配置文件
cp .env.example .env

# 生成应用密钥
php artisan key:generate
```

### 5. 数据库设置

项目默认使用 SQLite 数据库：

```bash
# 创建数据库文件（如果不存在）
touch database/database.sqlite

# 运行数据库迁移
php artisan migrate

```

### 6. 生成 TypeScript 类型定义

这是本项目的核心特性 - 从 PHP Data 类自动生成 TypeScript 类型：

```bash
php artisan typescript:transform
```

这个命令会：

- 扫描所有带有 `#[TypeScript]` 注解的 PHP Data 类
- 将它们转换为 TypeScript 类型定义
- 生成到 `resources/types/generated.d.ts` 文件

### 7. 构建前端资源

```bash
# 开发模式（热重载）
npm run dev
# 或
pnpm dev

# 生产构建
npm run build
# 或
pnpm build
```

### 8. 启动开发服务器

```bash
# 启动 Laravel 开发服务器
php artisan serve

# 在另一个终端启动 Vite 开发服务器
npm run dev
```

现在可以在浏览器中访问 `http://localhost:8000`

## 开发工作流

### TypeScript 类型更新流程

当您修改了 PHP Data 类后，需要重新生成 TypeScript 类型：

```bash
# 1. 修改 PHP Data 类（如 app/Data/TodoData.php）
# 2. 重新生成类型定义
php artisan typescript:transform
# 3. TypeScript 会自动获得最新的类型定义
```

### 代码质量检查

```bash
# PHP 代码风格检查
./vendor/bin/pint

# TypeScript 类型检查
npm run types

# ESLint 检查
npm run lint

# Prettier 格式化
npm run format
```

## 项目结构

```
├── app/
│   ├── Data/                    # Spatie Data 类
│   │   ├── TodoData.php         # Todo 数据结构
│   │   ├── UserData.php         # 用户数据结构
│   │   ├── StoreTodoData.php    # 创建 Todo 请求
│   │   └── UpdateTodoData.php   # 更新 Todo 请求
│   ├── Http/Controllers/        # 控制器
│   └── Models/                  # Eloquent 模型
├── resources/
│   ├── js/                      # React 组件和页面
│   │   ├── components/          # 可复用组件
│   │   ├── pages/              # Inertia 页面组件
│   │   └── types/              # TypeScript 类型定义
│   └── types/
│       └── generated.d.ts       # 自动生成的类型定义
├── config/
│   └── typescript-transformer.php # TypeScript 转换器配置
└── database/
    ├── migrations/              # 数据库迁移文件
    └── database.sqlite          # SQLite 数据库文件
```

## 核心概念

### Spatie Laravel Data

本项目使用 Spatie Laravel Data 包来创建强类型的数据传输对象：

```php
#[TypeScript('Todo')]
class TodoData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string|null $description,
        public bool $completed,
        public Carbon $createdAt,
        public Carbon $updatedAt,
    ) {}
}
```

### TypeScript Transformer

自动将 PHP Data 类转换为 TypeScript 类型定义：

```typescript
declare namespace App.Data {
    export type Todo = {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: string;
        updatedAt: string;
    };
}
```

### 类型安全的表单

前端使用生成的类型确保类型安全：

```tsx
const { data, setData, post } = useForm<App.Data.StoreTodoRequest>({
    title: '',
    description: null,
});
```

## 配置说明

### TypeScript Transformer 配置

在 `config/typescript-transformer.php` 中配置类型转换规则：

```php
'default_type_replacements' => [
    DateTime::class => 'string',
    Carbon\Carbon::class => 'string',
    'Illuminate\Support\Carbon' => 'string',
],
```

### 开发脚本

在 `package.json` 中定义的有用脚本：

```json
{
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "types": "tsc --noEmit",
        "lint": "eslint . --fix",
        "format": "prettier --write resources/"
    }
}
```

## 相关链接

- [Laravel 文档](https://laravel.com/docs)
- [React 文档](https://react.dev)
- [Inertia.js 文档](https://inertiajs.com)
- [Spatie Laravel Data](https://spatie.be/docs/laravel-data)
- [Spatie TypeScript Transformer](https://spatie.be/docs/typescript-transformer)
- [Tailwind CSS](https://tailwindcss.com)
