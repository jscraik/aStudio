---
inclusion: always
---

# Page Development Guide

This guide explains how to create and integrate new page views in the ChatUI application. Follow these patterns for consistency and maintainability.

## 📁 Project Structure for Pages

```
apps/web/src/
├── Router.tsx              # Main routing system
├── pages/                  # App-specific pages
│   ├── SettingsPage.tsx   # Settings page example
│   ├── ProfilePage.tsx    # Profile page example
│   └── AboutPage.tsx      # About page example
└── main.tsx               # App entry point

packages/ui/src/app/pages/  # Reusable page components
├── DashboardPage.tsx      # Dashboard component
├── DashboardPage.stories.tsx
├── DesignSystemPage.tsx   # Design system docs
└── TypographyPage.tsx     # Typography docs

packages/widgets/src/       # Widget versions of pages
└── dashboard-widget/
    └── main.tsx           # Standalone dashboard widget
```

## 🎯 Three Approaches to Creating Pages

### Approach 1: Simple App Pages (Most Common)

**Use for**: App-specific pages that don't need to be reused elsewhere.

**Steps:**

1. Create page in `apps/web/src/pages/YourPage.tsx`
2. Add route type to `apps/web/src/Router.tsx`
3. Add route handling in Router switch statement
4. Navigate using `onNavigate("yourpage")`

**Template:**

```tsx
// apps/web/src/pages/YourPage.tsx
import { Button, Card, IconButton } from "@chatui/ui";
import type { Route } from "../Router";

interface YourPageProps {
  onNavigate: (route: Route) => void;
}

export function YourPage({ onNavigate }: YourPageProps) {
  return (
    <div className="min-h-screen bg-[var(--foundation-bg-dark-1)]">
      {/* Header with back button */}
      <div className="border-b border-white/10 bg-[var(--foundation-bg-dark-2)]">
        <div className="flex items-center gap-3 p-4">
          <IconButton
            icon={<span>←</span>}
            onClick={() => onNavigate("chat")}
            title="Back to Chat"
            variant="ghost"
          />
          <h1 className="text-xl font-semibold text-white">Your Page</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Page Content</h2>
          {/* Your page content here */}
        </Card>
      </div>
    </div>
  );
}
```

### Approach 2: Reusable Library Pages

**Use for**: Pages that will be reused across multiple apps or as widgets.

**Steps:**

1. Create page in `packages/ui/src/app/pages/YourPage.tsx`
2. Create Storybook story `packages/ui/src/app/pages/YourPage.stories.tsx`
3. Export from `packages/ui/src/index.ts`
4. Use in apps: `import { YourPage } from "@chatui/ui"`

**Template:**

```tsx
// packages/ui/src/app/pages/YourPage.tsx
import { Card, Button } from "../components/ui";

export interface YourPageProps {
  /** Navigation callback */
  onNavigate?: (page: string) => void;
  /** Custom header content */
  headerSlot?: React.ReactNode;
  /** Custom sidebar content */
  sidebarSlot?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable page component with customizable slots
 */
export function YourPage({ 
  onNavigate, 
  headerSlot, 
  sidebarSlot,
  className 
}: YourPageProps) {
  return (
    <div className={cn("min-h-screen bg-[var(--foundation-bg-dark-1)]", className)}>
      {/* Header */}
      <div className="border-b border-white/10 bg-[var(--foundation-bg-dark-2)] p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Your Page</h1>
          {headerSlot}
        </div>
      </div>

      <div className="flex">
        {/* Optional Sidebar */}
        {sidebarSlot && (
          <div className="w-64 border-r border-white/10 bg-[var(--foundation-bg-dark-2)] p-4">
            {sidebarSlot}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Your reusable content here */}
        </div>
      </div>
    </div>
  );
}

YourPage.displayName = "YourPage";
```

### Approach 3: Widget Pages

**Use for**: Standalone widgets for ChatGPT integration.

**Steps:**

1. Create widget in `packages/widgets/src/your-widget/main.tsx`
2. Add build entry to `packages/widgets/vite.config.ts`
3. Widget becomes available as standalone HTML

## 🔄 Router Integration

### Adding New Routes

1. **Update Route Type** in `apps/web/src/Router.tsx`:

```tsx
export type Route = 
  | "chat"
  | "harness" 
  | "settings"
  | "profile"
  | "about"
  | "yournewpage";  // Add your route
```

1. **Add URL Parsing**:

```tsx
// In Router component's useState initializer
if (path === "/yournewpage") return "yournewpage";
```

1. **Add Route Handling**:

```tsx
// In renderPage() switch statement
case "yournewpage":
  return <YourNewPage onNavigate={navigate} />;
```

1. **Add PopState Handling**:

```tsx
// In handlePopState function
else if (path === "/yournewpage") setCurrentRoute("yournewpage");
```

### Navigation Patterns

**From any component:**

```tsx
// Using onNavigate prop
<Button onClick={() => onNavigate("settings")}>
  Go to Settings
</Button>

// Direct navigation (if you have access to navigate function)
<Button onClick={() => navigate("profile")}>
  View Profile
</Button>
```

**Adding navigation to existing components:**

```tsx
// Extend ChatUIRoot with navigation
<ChatUIRoot 
  onNavigate={(route) => navigate(route)}
  headerSlot={
    <Button onClick={() => navigate("settings")}>
      Settings
    </Button>
  }
/>
```

## 🎨 Design System Integration

### Required Imports

```tsx
import { 
  Button, 
  Card, 
  IconButton,
  Toggle,
  RangeSlider,
  SegmentedControl,
  // ... other components
} from "@chatui/ui";
```

### Standard Page Layout

```tsx
<div className="min-h-screen bg-[var(--foundation-bg-dark-1)]">
  {/* Header */}
  <div className="border-b border-white/10 bg-[var(--foundation-bg-dark-2)]">
    {/* Header content */}
  </div>
  
  {/* Content */}
  <div className="max-w-4xl mx-auto p-6">
    {/* Page content */}
  </div>
</div>
```

### Common Patterns

- **Back Button**: Always include `IconButton` with `←` icon
- **Page Title**: Use `text-xl font-semibold text-white` for consistency
- **Content Cards**: Wrap sections in `Card` components
- **Spacing**: Use `space-y-6` for vertical spacing, `gap-4` for grids
- **Colors**: Use CSS custom properties: `var(--foundation-bg-dark-1)`

## 🧪 Testing Pages

### Storybook Stories

Create stories for reusable pages:

```tsx
// packages/ui/src/app/pages/YourPage.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { YourPage } from "./YourPage";

const meta: Meta<typeof YourPage> = {
  title: "Pages/YourPage",
  component: YourPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomHeader: Story = {
  args: {
    headerSlot: <Button>Custom Action</Button>,
  },
};
```

### Manual Testing

```bash
# Test in web app
pnpm dev
# Navigate to http://localhost:5176/yourpage

# Test in Storybook
pnpm storybook:dev
# Navigate to Pages/YourPage
```

## 📋 Checklist for New Pages

### App Pages

- [ ] Created in `apps/web/src/pages/`
- [ ] Added route type to Router
- [ ] Added URL parsing
- [ ] Added route handling
- [ ] Added popstate handling
- [ ] Includes back button
- [ ] Uses design system components
- [ ] Tested navigation

### Library Pages

- [ ] Created in `packages/ui/src/app/pages/`
- [ ] Includes proper TypeScript interfaces
- [ ] Has customizable slots (header, sidebar)
- [ ] Created Storybook story
- [ ] Exported from `packages/ui/src/index.ts`
- [ ] Tested in Storybook
- [ ] Documented props with JSDoc

### Widget Pages

- [ ] Created in `packages/widgets/src/`
- [ ] Added to vite.config.ts entries
- [ ] Tested as standalone widget
- [ ] Handles parent communication

## 🚨 Common Pitfalls

1. **Missing Route Type**: Always update the `Route` type when adding new routes
2. **Inconsistent Styling**: Use design system components and CSS custom properties
3. **Missing Back Navigation**: Every page should have a way to return to chat
4. **No Storybook Story**: Reusable pages should always have stories
5. **Hardcoded Colors**: Use `var(--foundation-*)` instead of hardcoded colors
6. **Missing TypeScript**: All props should be properly typed

## 🔧 Troubleshooting

**Page not loading?**

- Check route is added to all Router locations
- Verify component is imported correctly
- Check for TypeScript errors

**Styling issues?**

- Ensure CSS custom properties are used
- Check component imports from `@chatui/ui`
- Verify Tailwind classes are available

**Navigation not working?**

- Check `onNavigate` prop is passed correctly
- Verify route name matches exactly
- Check browser console for errors

Follow these patterns and your pages will integrate seamlessly with the ChatUI system!
