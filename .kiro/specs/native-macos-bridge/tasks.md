# Implementation Plan: Native macOS Bridge

## Overview

This implementation plan follows a modular SwiftUI library approach that enhances the existing React/Apps SDK UI system without disrupting it. The plan focuses on creating four distinct Swift packages that provide a scalable foundation for native macOS development while maintaining perfect design consistency with the existing web application.

The approach eliminates JavaScriptCore complexity and provides clean, maintainable SwiftUI components that mirror React component APIs.

## Phase 1: Modular SwiftUI Foundation (Start Here - Settings Primitives)

Focus on creating the four core Swift packages with settings primitives as the first deliverable.

- [ ] 1. Create Swift package structure for modular architecture
  - Create `swift/ChatUIFoundation/Package.swift` with no dependencies
  - Create `swift/ChatUIComponents/Package.swift` depending on ChatUIFoundation
  - Create `swift/ChatUIThemes/Package.swift` depending on ChatUIFoundation
  - Create `swift/ChatUIShellChatGPT/Package.swift` depending on Foundation, Components, Themes
  - Set up proper directory structure: `Sources/{PackageName}/` for each package
  - Configure for iOS 15+ and macOS 13+ deployment targets
  - _Requirements: 2.1, 2.2, 3.1, 4.1, 5.1_

- [ ] 2. Implement ChatUIFoundation package with semantic tokens
  - Create `FColor.swift` with semantic color API using Asset Catalog names:
    - Surface colors: `bgApp`, `bgCard`, `bgCardAlt` (for hover/pressed overlays)
    - Text colors: `textPrimary`, `textSecondary`, `textTertiary`
    - Icon colors: `iconPrimary`, `iconSecondary`, `iconTertiary`
    - Accent colors: `accentGreen`, `accentBlue`, `accentOrange`, `accentRed`, `accentPurple`
    - Divider/border: `divider`
  - Create `FType.swift` with typography styles matching React components:
    - `title()`: 16pt semibold for section headers
    - `sectionTitle()`: 13pt semibold for subsections
    - `rowTitle()`, `rowValue()`: 14pt regular for row content
    - `caption()`, `footnote()`: 12pt regular for secondary text
    - Tracking constants: `trackingRow()` (-0.3), `trackingCaption()` (-0.2)
  - Create `FSpacing.swift` with standard spacing constants:
    - `s2`, `s4`, `s8`, `s12`, `s16`, `s24`, `s32` matching React spacing scale
  - Create `Platform.swift` with platform detection helpers:
    - `isMac` boolean for conditional macOS-only features
    - Hover state helpers that no-op on iOS
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 2.1 Create Asset Catalog with light/dark color variants
  - Generate Asset Catalog structure in `swift/ChatUIFoundation/Sources/ChatUIFoundation/Resources/`
  - Create `.colorset` folders for each semantic color with light/dark variants
  - Ensure automatic light/dark mode switching through Asset Catalog
  - **Property 11: Asset Catalog Light/Dark Mode Consistency**
  - **Validates: Requirements 1.2, 2.1**

- [ ] 3. Implement ChatUIThemes package with ChatGPT preset
  - Create `ChatGPTTheme.swift` with pixel-perfect constants:
    - Radii: `appCornerRadius` (18), `cardCornerRadius` (12), `rowCornerRadius` (10), `pillCornerRadius` (999)
    - Shadows: `appShadowOpacity` (0.45), `appShadowRadius` (30), `appShadowYOffset` (18)
    - Borders: `cardBorderOpacityLight` (0.35), `cardBorderOpacityDark` (0.20)
    - Dividers: `dividerOpacityLight` (0.35), `dividerOpacityDark` (0.25)
    - Row metrics: `rowHPadding` (12), `rowVPadding` (10), `rowIconSize` (18), `rowChevronSize` (14)
    - Hover/pressed overlays: opacity values for light/dark modes (0.55/0.70)
  - Create `DefaultTheme.swift` with native macOS styling as alternative
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 4. Implement ChatUIComponents package - Settings primitives
  - Create `SettingsDivider.swift`:
    - 1pt height rectangle using `FColor.divider`
    - Opacity varies by color scheme using `ChatGPTTheme` constants
  - Create `SettingsCardView.swift`:
    - Rounded container with `ChatGPTTheme.cardCornerRadius`
    - Background: `FColor.bgCard`
    - Stroke border with scheme-dependent opacity
    - Accepts generic `@ViewBuilder` content
  - Create `SettingRowView.swift` (core primitive):
    - Supports optional icon (AnyView), title, subtitle
    - Trailing options: `.none`, `.chevron`, `.text(String)`, `.custom(AnyView)`
    - Optional action closure for tappable rows
    - macOS hover overlay using `Platform.isMac` check
    - Pressed state overlay for both platforms
    - Inset padding (6pt horizontal) for "floating row" appearance
    - Uses `ChatGPTTheme` metrics for all spacing/sizing
  - Create `FoundationSwitchStyle.swift`:
    - Custom toggle style matching ChatGPT switch design
    - 42x22pt capsule with 18pt circle thumb
    - Green accent when on, `bgCardAlt` when off
    - Smooth 0.15s animation on toggle
    - White circle with subtle shadow
  - Create `SettingToggleView.swift`:
    - Composes `SettingRowView` with `Toggle` in trailing position
    - Uses `FoundationSwitchStyle` for consistent appearance
  - Create `SettingDropdownView.swift`:
    - Composes `SettingRowView` with `Menu` in trailing position
    - Shows current selection text + small chevron pill (18pt circle)
    - Menu presents all options on click
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4.1 Write unit tests for settings primitives
  - Test `SettingRowView` rendering with all trailing variants
  - Test hover state behavior on macOS (using `Platform.isMac`)
  - Test `FoundationSwitchStyle` toggle animation and state
  - Test `SettingToggleView` and `SettingDropdownView` composition
  - **Property 3: Component Library API Parity**
  - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

- [ ] 5. Create example settings view and preview harness
  - Create `SettingsExampleView.swift` demonstrating all primitives:
    - Section headers using `FType.sectionTitle()`
    - `SettingsCardView` containing multiple rows
    - `SettingToggleView` for boolean preferences
    - `SettingDropdownView` for selection (e.g., accent color)
    - `SettingsDivider` between rows
  - Create SwiftUI previews for light/dark mode
  - Create macOS/iOS preview variants showing platform differences
  - Add to playground app for live testing
  - _Requirements: 3.4, 3.5, 8.1_

- [ ] 6. Phase 1 checkpoint - Settings Primitives Complete
  **Definition of Done:**
  - [ ] All four Swift packages compile successfully
  - [ ] ChatUIFoundation provides semantic tokens via Asset Catalog
  - [ ] ChatUIThemes provides ChatGPT-style constants
  - [ ] ChatUIComponents provides 6 settings primitives (Divider, Card, Row, Switch, Toggle, Dropdown)
  - [ ] Example settings view renders pixel-close to React equivalent
  - [ ] Light/dark mode switching works automatically
  - [ ] macOS hover states work correctly
  - [ ] Unit tests pass for all primitives
  - [ ] SwiftUI previews render in Xcode

## Phase 2: Enhanced Token Generation & Build System

Integrate with existing token system and add automated build pipeline.

- [ ] 7. Enhance token generator to output Swift Asset Catalogs
  - Extend existing `packages/tokens/` generator to produce Asset Catalog structure
  - Generate `.colorset` folders with `Contents.json` for each semantic color
  - Include light/dark variants from existing token definitions
  - Output to `swift/ChatUIFoundation/Sources/ChatUIFoundation/Resources/`
  - Maintain deterministic output (no timestamps in generated files)
  - Create separate `manifest.json` with SHA hashes for validation
  - **Property 1: Enhanced Token Generation Consistency**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 8. Build enhanced monorepo pipeline for Swift packages
  - Create build scripts that handle both npm and Swift Package Manager
  - Implement version synchronization across package.json and Package.swift files
  - Add incremental build support detecting changes in Swift packages
  - Set up CI/CD pipeline to test Swift package compilation
  - Add validation that Swift constants match CSS custom properties
  - **Property 6: Enhanced Build Pipeline Completeness**
  - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

- [ ] 9. Expand ChatUIComponents with additional primitives
  - Create `ListItemView.swift` for sidebar navigation:
    - Similar to `SettingRowView` but optimized for navigation lists
    - Supports selection state highlighting
    - macOS hover effects, iOS pressed states
  - Create `ButtonView.swift` with standard button variants:
    - Variants: default, destructive, outline, secondary, ghost, link
    - Sizes: default, sm, lg, icon
    - Uses `ChatGPTTheme` for corner radii and spacing
  - Create `InputView.swift` for text input:
    - Native macOS/iOS text field styling
    - Focus ring using `FColor` tokens
    - Placeholder text support
  - _Requirements: 3.1, 3.2, 3.5_

- [ ] 10. Implement ChatUIShellChatGPT package (optional shell layouts)
  - Create `VisualEffectView.swift`:
    - macOS: `NSViewRepresentable` wrapping `NSVisualEffectView`
    - iOS: Fallback using SwiftUI `Material`
    - Supports sidebar and window background materials
  - Create `RoundedAppContainer.swift`:
    - Clips content to `ChatGPTTheme.appCornerRadius`
    - Adds border stroke with subtle opacity
    - Applies shadow using `ChatGPTTheme` shadow constants
  - Create `AppShellView.swift`:
    - `NavigationSplitView` with sidebar and detail panes
    - Applies `VisualEffectView` backgrounds
    - Configurable sidebar width (280-400pt)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 11. Create comprehensive snapshot tests
  - Set up snapshot testing framework for SwiftUI components
  - Generate snapshots for light/dark mode on iOS/macOS
  - Test all settings primitives in both themes
  - Test hover states on macOS
  - Validate pixel-close consistency with React components
  - **Property 8: Development Experience Quality**
  - **Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

- [ ] 12. Phase 2 checkpoint - Complete Component Library
  **Definition of Done:**
  - [ ] Token generator outputs Swift Asset Catalogs automatically
  - [ ] Build pipeline handles both React and SwiftUI builds
  - [ ] Version synchronization works across package managers
  - [ ] ChatUIComponents includes 10+ reusable primitives
  - [ ] ChatUIShellChatGPT provides optional complete layouts
  - [ ] Snapshot tests pass for all components
  - [ ] CI/CD pipeline validates Swift package compilation
  - [ ] Documentation generated for all public APIs

## Phase 3: Production Application & MCP Integration

Build complete native macOS application using the SwiftUI component library.

- [ ] 13. Create production macOS application structure
  - Create new macOS app target using SwiftUI App lifecycle
  - Add dependencies on all four ChatUI Swift packages
  - Implement main window using `AppShellView` from ChatUIShellChatGPT
  - Create settings panel using settings primitives
  - Add menu bar integration with standard macOS menus
  - _Requirements: 5.1, 5.2, 7.1_

- [ ] 14. Integrate with existing MCP tool system
  - Implement Swift networking layer to call existing web-based MCP infrastructure
  - Create widget renderer using SwiftUI components styled with ChatUIFoundation tokens
  - Handle macOS-specific authentication flows (Keychain integration)
  - Ensure backward compatibility with all existing MCP tool contracts
  - **Property 7: MCP Tool Integration Compatibility**
  - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

- [ ] 15. Add native macOS system integration
  - Implement file system access using native Swift APIs with permission handling
  - Add notification system using `UserNotifications` framework
  - Create native share sheet integration
  - Add Spotlight search integration for chat history
  - Implement proper app lifecycle and state restoration
  - _Requirements: 7.1, 7.5_

- [ ] 16. Create comprehensive documentation and examples
  - Write adoption guide explaining how to use each Swift package
  - Create parity checklist comparing React and SwiftUI components
  - Document Asset Catalog color setup process
  - Provide example code for common patterns
  - Create migration guide for teams adopting SwiftUI components
  - **Property 9: Incremental Adoption Compatibility**
  - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

- [ ] 17. Phase 3 checkpoint - Production Ready
  **Definition of Done:**
  - [ ] Complete macOS application runs and connects to MCP infrastructure
  - [ ] All MCP tools work correctly through native app
  - [ ] Widgets render using native SwiftUI components
  - [ ] macOS system integration features work (notifications, file access, etc.)
  - [ ] Documentation is comprehensive and includes examples
  - [ ] Parity checklist shows alignment with React components
  - [ ] App passes macOS App Store review guidelines
  - [ ] Distribution packages build successfully

  - [ ] Documentation is comprehensive and accurate
  - [ ] Migration guides are complete and tested
  - [ ] Distribution packages build successfully

## Implementation Phases

### Phase 1: Modular SwiftUI Foundation (Start Here - Settings Primitives)

**Goal**: Create four core Swift packages with settings primitives as first deliverable
**Risk**: Lowest
**Tasks**: 1-6
**Deliverable**: Working settings UI matching React component appearance

Focus on building the modular package architecture with concrete, pixel-perfect settings components. This provides immediate value and validates the approach.

### Phase 2: Enhanced Token Generation & Build System

**Goal**: Integrate with existing token system and expand component library
**Risk**: Low-Medium
**Tasks**: 7-12
**Deliverable**: Automated token generation, complete component library, optional shell layouts

Automate the bridge between React and SwiftUI through enhanced token generation, then expand the component library with additional primitives and optional shell layouts.

### Phase 3: Production Application & MCP Integration

**Goal**: Build complete native macOS application with MCP integration
**Risk**: Medium
**Tasks**: 13-17
**Deliverable**: Production-ready macOS app with full MCP tool support

Create a complete native macOS application using the SwiftUI component library, integrate with existing MCP infrastructure, and add native macOS system features.

## Notes

- **Start with Phase 1** - Settings primitives provide immediate, tangible value
- **Modular Architecture** - Four distinct packages enable incremental adoption
- **No JavaScriptCore** - Eliminates complexity while maintaining design consistency
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- SwiftUI previews enable rapid iteration during development

## Implementation Details

### Package Structure

```
swift/
├── ChatUIFoundation/
│   ├── Package.swift
│   └── Sources/ChatUIFoundation/
│       ├── FColor.swift          # Semantic colors via Asset Catalog
│       ├── FType.swift           # Typography styles + tracking
│       ├── FSpacing.swift        # Spacing constants
│       ├── Platform.swift        # Platform detection helpers
│       └── Resources/
│           └── [Asset Catalog]   # Light/dark color variants
├── ChatUIComponents/
│   ├── Package.swift
│   └── Sources/ChatUIComponents/
│       ├── SettingsDivider.swift
│       ├── SettingsCardView.swift
│       ├── SettingRowView.swift
│       ├── FoundationSwitchStyle.swift
│       ├── SettingToggleView.swift
│       ├── SettingDropdownView.swift
│       ├── ListItemView.swift
│       ├── ButtonView.swift
│       └── InputView.swift
├── ChatUIThemes/
│   ├── Package.swift
│   └── Sources/ChatUIThemes/
│       ├── ChatGPTTheme.swift    # Pixel-perfect constants
│       └── DefaultTheme.swift    # Native macOS styling
└── ChatUIShellChatGPT/
    ├── Package.swift
    └── Sources/ChatUIShellChatGPT/
        ├── VisualEffectView.swift
        ├── RoundedAppContainer.swift
        └── AppShellView.swift
```

### Key Design Decisions

**Asset Catalog for Colors**: Automatic light/dark mode support without manual switching logic

**Semantic Token API**: Components consume `FColor.textPrimary` not `Color("text-primary")` for better discoverability

**Platform Helpers**: Centralize iOS/macOS differences in `Platform.swift` rather than scattered `#if os(macOS)` checks

**Theme Separation**: ChatGPT-specific styling lives in ChatUIThemes, keeping core components theme-agnostic

**Composition Over Inheritance**: `SettingToggleView` composes `SettingRowView` + `Toggle` rather than subclassing

## SwiftUI Development Workflow

### Two Fast Development Loops

**SwiftUI Previews** (best for components):

- Open component file (e.g., `ChatUIButton.swift`)
- Show Canvas: `⌥⌘⏎` (Option+Command+Enter)
- Resume previews: `⌥⌘P`
- Use `#Preview { ... }` blocks for variants

**Playground App** (best for interactions):

- Run: `⌘R`
- Build only: `⌘B`
- Test keyboard focus, menus, dialogs, real window behavior

### Standard Preview Pattern

Create a consistent preview helper:

```swift
// apps/macos/ChatUIPlayground/PreviewHelpers/PreviewScenarios.swift
import SwiftUI
import ChatUISwift

struct PreviewScenarios<Content: View>: View {
    let content: () -> Content
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            content()
        }
        .padding(24)
        .frame(width: 480)
    }
}
```

Use in component files:

```swift
#Preview("Button Variants") {
    PreviewScenarios {
        ChatUIButton(variant: .default) { Text("Default") }
        ChatUIButton(variant: .destructive) { Text("Destructive") }
        ChatUIButton(variant: .outline) { Text("Outline") }
    }
}

#Preview("Dark Mode") {
    PreviewScenarios {
        ChatUIButton(variant: .default) { Text("Default") }
    }
    .environment(\.colorScheme, .dark)
}

#Preview("High Contrast") {
    PreviewScenarios {
        ChatUIButton(variant: .default) { Text("Default") }
    }
    .environment(\.accessibilityReduceMotion, true)
    .environment(\.legibilityWeight, .bold)
}
```

### SwiftUI + AppKit Integration Rules

**Default**: SwiftUI components
**Use AppKit wrappers only when**: SwiftUI is missing something or behaves poorly

**Three Integration Patterns**:

1. **Embed AppKit inside SwiftUI** (most common): `NSViewRepresentable`
2. **Embed SwiftUI inside AppKit**: `NSHostingView(rootView:)`
3. **App lifecycle/menus**: SwiftUI `Commands {}`, `NSApplicationDelegateAdaptor`

### Phase 3 Business Logic Constraint

If JSCore is chosen, maintain "sync-only" pattern:

- JS returns `{ kind: "ToolRequest", id, name, args }` synchronously
- Swift executes async work
- Swift calls back `runtime.resolve(id, result)` synchronously
- Preserves "pure JS, no IO" constraint

### Token Generation Details

**Deterministic Output**:

- Keep `DesignTokens.swift` deterministic (no timestamps)
- Write separate `packages/tokens/outputs/manifest.json`:

  ```json
  {
    "version": "1.0.0",
    "sha256": {
      "swift": "abc123...",
      "css": "def456..."
    },
    "generated": "2024-01-01T00:00:00Z"
  }
  ```
