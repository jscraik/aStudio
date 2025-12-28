//
//  ComponentGallery.swift
//  ChatUIPlayground
//
//  Created by Jamie Scott Craik on 28-12-2025.
//

import SwiftUI
import ChatUISwift

struct ComponentGallery: View {
    let selectedComponent: ComponentType

    var body: some View {
        ScrollView {
            VStack(spacing: DesignTokens.Spacing.md) {
                AccessibilityChecklist()
                switch selectedComponent {
                case .button:
                    ButtonGallery()
                case .input:
                    InputGallery()
                case .card:
                    CardGallery()
                case .modal:
                    ModalGallery()
                case .navigation:
                    NavigationGallery()
                case .toast:
                    ToastGallery()
                case .dataDisplay:
                    DataDisplayGallery()
                case .tokens:
                    TokensGallery()
                }
            }
            .padding(DesignTokens.Spacing.md)
        }
    }
}

// MARK: - Button Gallery

struct ButtonGallery: View {
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Buttons")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)

            // Variants
            GroupBox(label: Text("Variants")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                    HStack(spacing: DesignTokens.Spacing.smXs) {
                        ChatUIButton("Default", variant: .default) {}
                        ChatUIButton("Destructive", variant: .destructive) {}
                        ChatUIButton("Outline", variant: .outline) {}
                    }
                    HStack(spacing: DesignTokens.Spacing.smXs) {
                        ChatUIButton("Secondary", variant: .secondary) {}
                        ChatUIButton("Ghost", variant: .ghost) {}
                        ChatUIButton("Link", variant: .link) {}
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Sizes
            GroupBox(label: Text("Sizes")) {
                HStack(spacing: DesignTokens.Spacing.smXs) {
                    ChatUIButton("Small", variant: .default, size: .sm) {}
                    ChatUIButton("Default", variant: .default, size: .default) {}
                    ChatUIButton("Large", variant: .default, size: .lg) {}
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Icon Buttons
            GroupBox(label: Text("Icon Buttons")) {
                HStack(spacing: DesignTokens.Spacing.smXs) {
                    ChatUIButton(systemName: "heart.fill", variant: .default, size: .icon, accessibilityLabel: "Favorite") {}
                    ChatUIButton(systemName: "trash", variant: .destructive, size: .icon, accessibilityLabel: "Delete") {}
                    ChatUIButton(systemName: "square.and.arrow.up", variant: .secondary, size: .icon, accessibilityLabel: "Share") {}
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Accessibility
            GroupBox(label: Text("Accessibility")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                    HStack(spacing: DesignTokens.Spacing.smXs) {
                        ChatUIButton(
                            systemName: "trash",
                            variant: .destructive,
                            size: .icon,
                            accessibilityLabel: "Delete item",
                            accessibilityHint: "Permanently removes the selected item"
                        ) {}
                        ChatUIButton(
                            systemName: "square.and.arrow.up",
                            variant: .secondary,
                            size: .icon,
                            accessibilityLabel: "Share",
                            accessibilityHint: "Opens sharing options"
                        ) {}
                    }
                    ChatUIButton(
                        "Save",
                        variant: .default,
                        accessibilityHint: "Saves your changes"
                    ) {}
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Accessibility States
            GroupBox(label: Text("Accessibility States")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    // High Contrast Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("High Contrast Mode")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        Text("Simulates high contrast accessibility setting")
                            .font(.system(size: DesignTokens.Typography.Caption.size))
                            .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        
                        HStack(spacing: DesignTokens.Spacing.smXs) {
                            ChatUIButton("High Contrast", variant: .default) {}
                                .accessibilityHighContrast()
                            ChatUIButton("Outline", variant: .outline) {}
                                .accessibilityHighContrast()
                            ChatUIButton(
                                systemName: "heart.fill",
                                variant: .destructive,
                                size: .icon,
                                accessibilityLabel: "Favorite"
                            ) {}
                                .accessibilityHighContrast()
                        }
                    }
                    
                    Divider()
                    
                    // Focus Ring Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("Focus Ring Visibility")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        Text("Focus rings should be clearly visible for keyboard navigation")
                            .font(.system(size: DesignTokens.Typography.Caption.size))
                            .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        
                        HStack(spacing: DesignTokens.Spacing.smXs) {
                            ChatUIButton("Focusable", variant: .default) {}
                                .accessibilityFocusRing()
                            ChatUIButton("Tab Here", variant: .outline) {}
                                .accessibilityFocusRing()
                            ChatUIButton(
                                systemName: "magnifyingglass",
                                variant: .secondary,
                                size: .icon,
                                accessibilityLabel: "Search"
                            ) {}
                                .accessibilityFocusRing()
                        }
                    }
                    
                    Divider()
                    
                    // Reduced Motion Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("Reduced Motion")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        Text("Animations respect reduced motion preferences")
                            .font(.system(size: DesignTokens.Typography.Caption.size))
                            .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        
                        HStack(spacing: DesignTokens.Spacing.smXs) {
                            ChatUIButton("Animated", variant: .default) {}
                            ChatUIButton("Press Me", variant: .secondary) {}
                            Text("Animation duration: \(String(format: "%.1f", DesignTokens.Accessibility.Animation.duration()))s")
                                .font(.system(size: DesignTokens.Typography.Caption.size))
                                .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        }
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Disabled State
            GroupBox(label: Text("Disabled State")) {
                HStack(spacing: DesignTokens.Spacing.smXs) {
                    ChatUIButton("Disabled", variant: .default, isDisabled: true) {}
                    ChatUIButton("Disabled", variant: .outline, isDisabled: true) {}
                    ChatUIButton(
                        systemName: "heart",
                        variant: .ghost,
                        size: .icon,
                        isDisabled: true,
                        accessibilityLabel: "Favorite"
                    ) {}
                }
                .padding(DesignTokens.Spacing.sm)
            }
        }
    }
}

// MARK: - Input Gallery

struct InputGallery: View {
    @State private var defaultText = ""
    @State private var searchText = ""
    @State private var passwordText = ""
    @State private var disabledText = "Disabled input"

    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Typography.Body.lineHeight) {
            Text("Inputs")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)

            // Variants
            GroupBox(label: Text("Variants")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                    ChatUIInput(
                        text: $defaultText,
                        placeholder: "Default input",
                        variant: .default
                    )
                    ChatUIInput(
                        text: $searchText,
                        placeholder: "Search...",
                        variant: .search
                    )
                    ChatUIInput(
                        text: $passwordText,
                        placeholder: "Password",
                        variant: .password
                    )
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Sizes
            GroupBox(label: Text("Sizes")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                    ChatUIInput(
                        text: .constant(""),
                        placeholder: "Small input",
                        size: .sm
                    )
                    ChatUIInput(
                        text: .constant(""),
                        placeholder: "Default input",
                        size: .default
                    )
                    ChatUIInput(
                        text: .constant(""),
                        placeholder: "Large input",
                        size: .lg
                    )
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Accessibility + Submit
            GroupBox(label: Text("Accessibility + Submit")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                    ChatUIInput(
                        text: $searchText,
                        placeholder: "Search messages",
                        variant: .search,
                        accessibilityLabel: "Search messages",
                        accessibilityHint: "Type a keyword and press return",
                        submitLabel: .search
                    )
                    ChatUIInput(
                        text: $defaultText,
                        placeholder: "Email address",
                        accessibilityLabel: "Email address",
                        submitLabel: .done
                    )
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Accessibility States
            GroupBox(label: Text("Accessibility States")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    // High Contrast Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("High Contrast Mode")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                            ChatUIInput(
                                text: .constant("High contrast text"),
                                placeholder: "High contrast input",
                                variant: .default
                            )
                            .accessibilityHighContrast()
                            
                            ChatUIInput(
                                text: .constant(""),
                                placeholder: "Search with high contrast",
                                variant: .search
                            )
                            .accessibilityHighContrast()
                        }
                    }
                    
                    Divider()
                    
                    // Focus Ring Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("Focus Ring Visibility")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        Text("Tab to these inputs to see focus rings")
                            .font(.system(size: DesignTokens.Typography.Caption.size))
                            .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                            ChatUIInput(
                                text: .constant(""),
                                placeholder: "Focus ring test",
                                variant: .default,
                                accessibilityLabel: "Focus ring test input",
                                accessibilityHint: "Tab here to see focus ring"
                            )
                            .accessibilityFocusRing()
                            
                            ChatUIInput(
                                text: .constant(""),
                                placeholder: "Another focusable input",
                                variant: .search,
                                accessibilityLabel: "Second focus test input"
                            )
                            .accessibilityFocusRing()
                        }
                    }
                    
                    Divider()
                    
                    // Dynamic Type Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("Dynamic Type Support")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        Text("Text scales with system Dynamic Type settings")
                            .font(.system(size: DesignTokens.Typography.Caption.size))
                            .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                            ChatUIInput(
                                text: .constant(""),
                                placeholder: "Small size",
                                size: .sm
                            )
                            ChatUIInput(
                                text: .constant(""),
                                placeholder: "Default size",
                                size: .default
                            )
                            ChatUIInput(
                                text: .constant(""),
                                placeholder: "Large size",
                                size: .lg
                            )
                        }
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Disabled State
            GroupBox(label: Text("Disabled State")) {
                ChatUIInput(
                    text: $disabledText,
                    placeholder: "Disabled",
                    isDisabled: true
                )
                .padding(DesignTokens.Spacing.sm)
            }
        }
    }
}

// MARK: - Card Gallery

struct CardGallery: View {
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Cards")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)

            // Variants
            GroupBox(label: Text("Variants")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                    ChatUICard(variant: .default) {
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                            Text("Default Card")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            Text("This is a default card variant with no elevation or border.")
                                .font(.system(size: DesignTokens.Typography.Body.size))
                                .foregroundColor(DesignTokens.Colors.Text.secondary)
                        }
                    }

                    ChatUICard(variant: .elevated) {
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                            Text("Elevated Card")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            Text("This card has elevation with a subtle shadow effect.")
                                .font(.system(size: DesignTokens.Typography.Body.size))
                                .foregroundColor(DesignTokens.Colors.Text.secondary)
                        }
                    }

                    ChatUICard(variant: .outlined) {
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                            Text("Outlined Card")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            Text("This card has a visible border.")
                                .font(.system(size: DesignTokens.Typography.Body.size))
                                .foregroundColor(DesignTokens.Colors.Text.secondary)
                        }
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Accessibility States
            GroupBox(label: Text("Accessibility States")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    // High Contrast Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("High Contrast Mode")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        ChatUICard(variant: .outlined) {
                            VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                                Text("High Contrast Card")
                                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                                Text("This card adapts to high contrast settings for better visibility.")
                                    .font(.system(size: DesignTokens.Typography.Body.size))
                                    .foregroundColor(DesignTokens.Colors.Text.secondary)
                            }
                        }
                        .accessibilityHighContrast()
                    }
                    
                    Divider()
                    
                    // Reduced Transparency Preview
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        Text("Reduced Transparency")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        
                        Text("Shadows and transparency respect accessibility preferences")
                            .font(.system(size: DesignTokens.Typography.Caption.size))
                            .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        
                        HStack(spacing: DesignTokens.Spacing.smXs) {
                            ChatUICard(variant: .elevated) {
                                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                                    Text("Elevated")
                                        .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                                    Text("Shadow adapts to preferences")
                                        .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                        .foregroundColor(DesignTokens.Colors.Text.secondary)
                                }
                            }
                            
                            ChatUICard(variant: .outlined) {
                                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                                    Text("Outlined")
                                        .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                                    Text("Clear borders")
                                        .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                        .foregroundColor(DesignTokens.Colors.Text.secondary)
                                }
                            }
                        }
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Card with Actions
            GroupBox(label: Text("Card with Actions")) {
                ChatUICard(variant: .elevated) {
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.mdSm) {
                        HStack {
                            Image(systemName: "doc.fill")
                                .font(.system(size: 32))
                                .foregroundColor(DesignTokens.Colors.Accent.blue)
                            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                                Text("Document")
                                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                                Text("Last edited 2 hours ago")
                                    .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                    .foregroundColor(DesignTokens.Colors.Text.tertiary)
                            }
                            Spacer()
                        }
                        HStack(spacing: DesignTokens.Spacing.smXs) {
                            ChatUIButton("Open", variant: .default, size: .sm) {}
                            ChatUIButton("Share", variant: .secondary, size: .sm) {}
                        }
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }
        }
    }
}

// MARK: - Design Tokens Gallery

struct TokensGallery: View {
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Design Tokens")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)

            // Colors
            GroupBox(label: Text("Colors")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                    Text("Background")
                        .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                    HStack(spacing: DesignTokens.Spacing.xs) {
                        ColorSwatch(color: DesignTokens.Colors.Background.primary, name: "Primary")
                        ColorSwatch(color: DesignTokens.Colors.Background.secondary, name: "Secondary")
                        ColorSwatch(color: DesignTokens.Colors.Background.tertiary, name: "Tertiary")
                    }

                    Text("Text")
                        .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        .padding(.top, DesignTokens.Spacing.smXs)
                    HStack(spacing: DesignTokens.Spacing.xs) {
                        ColorSwatch(color: DesignTokens.Colors.Text.primary, name: "Primary")
                        ColorSwatch(color: DesignTokens.Colors.Text.secondary, name: "Secondary")
                        ColorSwatch(color: DesignTokens.Colors.Text.tertiary, name: "Tertiary")
                    }

                    Text("Accent")
                        .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        .padding(.top, DesignTokens.Spacing.smXs)
                    HStack(spacing: DesignTokens.Spacing.xs) {
                        ColorSwatch(color: DesignTokens.Colors.Accent.blue, name: "Blue")
                        ColorSwatch(color: DesignTokens.Colors.Accent.red, name: "Red")
                        ColorSwatch(color: DesignTokens.Colors.Accent.orange, name: "Orange")
                        ColorSwatch(color: DesignTokens.Colors.Accent.green, name: "Green")
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Typography
            GroupBox(label: Text("Typography")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                    Text("Heading 1")
                        .font(.system(size: DesignTokens.Typography.Heading1.size, weight: DesignTokens.Typography.Heading1.weight))
                    Text("Heading 2")
                        .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                    Text("Heading 3")
                        .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                    Text("Body text - The quick brown fox jumps over the lazy dog.")
                        .font(.system(size: DesignTokens.Typography.Body.size, weight: DesignTokens.Typography.Body.weight))
                    Text("Body small text - Used for secondary information.")
                        .font(.system(size: DesignTokens.Typography.BodySmall.size, weight: DesignTokens.Typography.BodySmall.weight))
                    Text("Caption text - Used for labels and captions.")
                        .font(.system(size: DesignTokens.Typography.Caption.size, weight: DesignTokens.Typography.Caption.weight))
                }
                .padding(DesignTokens.Spacing.sm)
            }

            // Spacing
            GroupBox(label: Text("Spacing Scale")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxs) {
                    ForEach(DesignTokens.Spacing.scale, id: \.self) { space in
                        HStack {
                            Text("\(Int(space))pt")
                                .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                .frame(width: 60, alignment: .leading)
                            Rectangle()
                                .fill(DesignTokens.Colors.Accent.blue)
                                .frame(width: CGFloat(space), height: 16)
                        }
                    }
                }
                .padding(DesignTokens.Spacing.sm)
            }
        }
    }
}

// MARK: - Color Swatch Component

struct ColorSwatch: View {
    let color: Color
    let name: String

    var body: some View {
        VStack(spacing: DesignTokens.Spacing.xxxs) {
            RoundedRectangle(cornerRadius: DesignTokens.CornerRadius.small)
                .fill(color)
                .frame(width: 48, height: 48)
                .overlay(
                    RoundedRectangle(cornerRadius: DesignTokens.CornerRadius.small)
                        .stroke(Color.black.opacity(0.1), lineWidth: 1)
                )
            Text(name)
                .font(.system(size: DesignTokens.Typography.Caption.size))
                .foregroundColor(DesignTokens.Colors.Text.secondary)
        }
    }
}

// MARK: - Modal Gallery

struct ModalGallery: View {
    @State private var showBasicModal = false
    @State private var showLargeModal = false
    @State private var showAlert = false
    @State private var showConfirmAlert = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Modal & Dialogs")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)
            
            // Basic Modals
            GroupBox(label: Text("Modal Sizes")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    HStack(spacing: DesignTokens.Spacing.sm) {
                        ChatUIButton("Small Modal", variant: .default) {
                            showBasicModal = true
                        }
                        
                        ChatUIButton("Large Modal", variant: .secondary) {
                            showLargeModal = true
                        }
                    }
                    
                    Text("Modals support proper focus management and keyboard navigation")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Alert Dialogs
            GroupBox(label: Text("Alert Dialogs")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    HStack(spacing: DesignTokens.Spacing.sm) {
                        ChatUIButton("Info Alert", variant: .default) {
                            showAlert = true
                        }
                        
                        ChatUIButton("Confirm Dialog", variant: .destructive) {
                            showConfirmAlert = true
                        }
                    }
                    
                    Text("Alert dialogs provide clear actions and proper accessibility")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
        }
        .modal(
            isPresented: $showBasicModal,
            title: "Basic Modal",
            size: .medium
        ) {
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
                Text("Modal Content")
                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                
                Text("This is a basic modal dialog with proper focus management. You can press Escape to close it or click the X button.")
                    .font(.system(size: DesignTokens.Typography.Body.size))
                    .foregroundColor(DesignTokens.Colors.Text.secondary)
                
                ChatUIInput(
                    text: .constant(""),
                    placeholder: "Focus test input",
                    accessibilityLabel: "Modal input field"
                )
                
                HStack {
                    Spacer()
                    ChatUIButton("Close", variant: .secondary) {
                        showBasicModal = false
                    }
                }
            }
        }
        .modal(
            isPresented: $showLargeModal,
            title: "Large Modal",
            size: .large
        ) {
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
                Text("Large Modal Content")
                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                
                Text("This is a larger modal that can contain more content. It demonstrates scrollable content and maintains proper focus management.")
                    .font(.system(size: DesignTokens.Typography.Body.size))
                    .foregroundColor(DesignTokens.Colors.Text.secondary)
                
                ForEach(1...10, id: \.self) { index in
                    ChatUICard(variant: .outlined) {
                        HStack {
                            Image(systemName: "doc.fill")
                                .foregroundColor(DesignTokens.Colors.Accent.blue)
                            VStack(alignment: .leading) {
                                Text("Item \(index)")
                                    .font(.system(size: DesignTokens.Typography.Body.size, weight: .semibold))
                                Text("Description for item \(index)")
                                    .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                    .foregroundColor(DesignTokens.Colors.Text.secondary)
                            }
                            Spacer()
                        }
                    }
                }
                
                HStack {
                    Spacer()
                    ChatUIButton("Cancel", variant: .secondary) {
                        showLargeModal = false
                    }
                    ChatUIButton("Save", variant: .default) {
                        showLargeModal = false
                    }
                }
            }
        }
        .alert(
            isPresented: $showAlert,
            title: "Information",
            message: "This is an informational alert dialog with a single action.",
            actions: [
                .default("OK") {
                    // Handle OK action
                }
            ]
        )
        .alert(
            isPresented: $showConfirmAlert,
            title: "Confirm Action",
            message: "Are you sure you want to delete this item? This action cannot be undone.",
            actions: [
                .cancel(),
                .destructive("Delete") {
                    // Handle delete action
                }
            ]
        )
    }
}

// MARK: - Navigation Gallery

struct NavigationGallery: View {
    @State private var selectedTab = 0
    @State private var breadcrumbItems: [ChatUIBreadcrumb.Item] = [
        ChatUIBreadcrumb.Item(title: "Home") { print("Navigate to Home") },
        ChatUIBreadcrumb.Item(title: "Documents") { print("Navigate to Documents") },
        ChatUIBreadcrumb.Item(title: "Current Folder")
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Navigation")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)
            
            // Navigation Bar
            GroupBox(label: Text("Navigation Bar")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    ChatUINavigationView(
                        title: "Sample Page",
                        showBackButton: true,
                        onBack: { print("Back pressed") },
                        trailingActions: [
                            .search { print("Search pressed") },
                            .settings { print("Settings pressed") }
                        ]
                    ) {
                        VStack {
                            Text("Navigation content goes here")
                                .font(.system(size: DesignTokens.Typography.Body.size))
                                .foregroundColor(DesignTokens.Colors.Text.secondary)
                                .padding(DesignTokens.Spacing.md)
                            Spacer()
                        }
                        .frame(height: 200)
                    }
                    
                    Text("Navigation bars follow macOS patterns with back buttons and trailing actions")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Tab Navigation
            GroupBox(label: Text("Tab Navigation")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    ChatUITabView(
                        selection: $selectedTab,
                        tabs: [
                            TabItem(title: "Overview", systemName: "house"),
                            TabItem(title: "Files", systemName: "folder"),
                            TabItem(title: "Settings", systemName: "gearshape")
                        ]
                    ) {
                        VStack {
                            switch selectedTab {
                            case 0:
                                Text("Overview Content")
                                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            case 1:
                                Text("Files Content")
                                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            case 2:
                                Text("Settings Content")
                                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            default:
                                EmptyView()
                            }
                            Spacer()
                        }
                        .frame(height: 150)
                        .padding(DesignTokens.Spacing.md)
                    }
                    
                    Text("Tab navigation with icons and selection states")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Breadcrumb Navigation
            GroupBox(label: Text("Breadcrumb Navigation")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    ChatUIBreadcrumb(items: breadcrumbItems)
                    
                    Text("Breadcrumbs show hierarchical navigation path")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
        }
    }
}

// MARK: - Toast Gallery

struct ToastGallery: View {
    @StateObject private var toastManager = ChatUIToastManager.shared
    
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Toast & Notifications")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)
            
            // Toast Styles
            GroupBox(label: Text("Toast Styles")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    HStack(spacing: DesignTokens.Spacing.sm) {
                        ChatUIButton("Info", variant: .default) {
                            toastManager.showInfo("This is an informational message")
                        }
                        
                        ChatUIButton("Success", variant: .default) {
                            toastManager.showSuccess("Operation completed successfully!")
                        }
                        
                        ChatUIButton("Warning", variant: .default) {
                            toastManager.showWarning("Please check your input")
                        }
                        
                        ChatUIButton("Error", variant: .destructive) {
                            toastManager.showError("Something went wrong")
                        }
                    }
                    
                    Text("Toast notifications appear temporarily and auto-dismiss")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Toast Positions
            GroupBox(label: Text("Toast Positions")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    HStack(spacing: DesignTokens.Spacing.sm) {
                        ChatUIButton("Top", variant: .secondary) {
                            toastManager.show("Top position toast", position: .top)
                        }
                        
                        ChatUIButton("Bottom", variant: .secondary) {
                            toastManager.show("Bottom position toast", position: .bottom)
                        }
                        
                        ChatUIButton("Top Leading", variant: .secondary) {
                            toastManager.show("Top leading toast", position: .topLeading)
                        }
                        
                        ChatUIButton("Bottom Trailing", variant: .secondary) {
                            toastManager.show("Bottom trailing toast", position: .bottomTrailing)
                        }
                    }
                    
                    Text("Toasts can be positioned in different areas of the screen")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // System Notifications
            GroupBox(label: Text("System Integration")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    HStack(spacing: DesignTokens.Spacing.sm) {
                        ChatUIButton("Request Permissions", variant: .default) {
                            Task {
                                let granted = await toastManager.requestNotificationPermissions()
                                toastManager.show(
                                    granted ? "Notification permissions granted" : "Notification permissions denied",
                                    style: granted ? .success : .warning
                                )
                            }
                        }
                        
                        ChatUIButton("System Notification", variant: .secondary) {
                            Task {
                                await toastManager.sendSystemNotification(
                                    title: "ChatUI Playground",
                                    body: "This is a system notification from the playground app"
                                )
                            }
                        }
                    }
                    
                    Text("Integration with macOS notification system")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
        }
        .toastContainer()
    }
}

// MARK: - Data Display Gallery

struct DataDisplayGallery: View {
    @State private var sampleData = SampleDataItem.sampleData
    
    var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text("Data Display")
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .padding(.bottom, DesignTokens.Spacing.smXs)
            
            // Table Component
            GroupBox(label: Text("Table")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    ChatUITable(
                        data: Array(sampleData.prefix(5)),
                        columns: [
                            ChatUITable.Column(title: "Name", width: 150),
                            ChatUITable.Column(title: "Status", width: 100, alignment: .center),
                            ChatUITable.Column(title: "Date", width: 120, alignment: .trailing)
                        ],
                        onRowTap: { item in
                            print("Tapped: \(item.name)")
                        }
                    ) { item in
                        HStack {
                            Text(item.name)
                                .font(.system(size: DesignTokens.Typography.Body.size))
                                .frame(width: 150, alignment: .leading)
                            
                            Text(item.status)
                                .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                .padding(.horizontal, DesignTokens.Spacing.xs)
                                .padding(.vertical, DesignTokens.Spacing.xxs)
                                .background(item.status == "Active" ? DesignTokens.Colors.Accent.green.opacity(0.2) : DesignTokens.Colors.Accent.orange.opacity(0.2))
                                .foregroundColor(item.status == "Active" ? DesignTokens.Colors.Accent.green : DesignTokens.Colors.Accent.orange)
                                .cornerRadius(DesignTokens.CornerRadius.small)
                                .frame(width: 100)
                            
                            Text(item.date)
                                .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                .foregroundColor(DesignTokens.Colors.Text.secondary)
                                .frame(width: 120, alignment: .trailing)
                        }
                    }
                    .frame(height: 200)
                    
                    Text("Sortable table with clickable rows and proper accessibility")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // List Component
            GroupBox(label: Text("Lists")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    HStack(spacing: DesignTokens.Spacing.md) {
                        // Plain List
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                            Text("Plain")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            
                            ChatUIList(
                                data: Array(sampleData.prefix(3)),
                                style: .plain,
                                onItemTap: { item in
                                    print("Tapped: \(item.name)")
                                }
                            ) { item in
                                HStack {
                                    Image(systemName: "doc.fill")
                                        .foregroundColor(DesignTokens.Colors.Accent.blue)
                                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                                        Text(item.name)
                                            .font(.system(size: DesignTokens.Typography.Body.size, weight: .medium))
                                        Text(item.status)
                                            .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                            .foregroundColor(DesignTokens.Colors.Text.secondary)
                                    }
                                    Spacer()
                                }
                            }
                            .frame(height: 120)
                        }
                        
                        // Grouped List
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                            Text("Grouped")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            
                            ChatUIList(
                                data: Array(sampleData.prefix(3)),
                                style: .grouped,
                                onItemTap: { item in
                                    print("Tapped: \(item.name)")
                                }
                            ) { item in
                                HStack {
                                    Image(systemName: "folder.fill")
                                        .foregroundColor(DesignTokens.Colors.Accent.orange)
                                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                                        Text(item.name)
                                            .font(.system(size: DesignTokens.Typography.Body.size, weight: .medium))
                                        Text(item.date)
                                            .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                            .foregroundColor(DesignTokens.Colors.Text.secondary)
                                    }
                                    Spacer()
                                }
                            }
                            .frame(height: 120)
                        }
                    }
                    
                    Text("Different list styles for various use cases")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
            
            // Data Cards
            GroupBox(label: Text("Data Cards")) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                    HStack(spacing: DesignTokens.Spacing.sm) {
                        ChatUIDataCard(
                            title: "Project Alpha",
                            subtitle: "Updated 2 hours ago",
                            actions: [
                                .edit { print("Edit project") },
                                .share { print("Share project") }
                            ]
                        ) {
                            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                                HStack {
                                    Image(systemName: "folder.fill")
                                        .font(.system(size: 24))
                                        .foregroundColor(DesignTokens.Colors.Accent.blue)
                                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                                        Text("24 files")
                                            .font(.system(size: DesignTokens.Typography.Body.size, weight: .medium))
                                        Text("1.2 MB")
                                            .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                            .foregroundColor(DesignTokens.Colors.Text.secondary)
                                    }
                                    Spacer()
                                }
                            }
                        }
                        
                        ChatUIDataCard(
                            title: "Analytics",
                            subtitle: "Live data",
                            actions: [
                                .more { print("More options") }
                            ]
                        ) {
                            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                                HStack {
                                    Image(systemName: "chart.bar.fill")
                                        .font(.system(size: 24))
                                        .foregroundColor(DesignTokens.Colors.Accent.green)
                                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                                        Text("1,234 views")
                                            .font(.system(size: DesignTokens.Typography.Body.size, weight: .medium))
                                        Text("+12% today")
                                            .font(.system(size: DesignTokens.Typography.BodySmall.size))
                                            .foregroundColor(DesignTokens.Colors.Accent.green)
                                    }
                                    Spacer()
                                }
                            }
                        }
                    }
                    
                    Text("Data cards with actions and structured content")
                        .font(.system(size: DesignTokens.Typography.Caption.size))
                        .foregroundColor(DesignTokens.Colors.Text.tertiary)
                }
                .padding(DesignTokens.Spacing.sm)
            }
        }
    }
}

// MARK: - Sample Data

struct SampleDataItem: Identifiable {
    let id = UUID()
    let name: String
    let status: String
    let date: String
    
    static let sampleData = [
        SampleDataItem(name: "Document 1", status: "Active", date: "Dec 28, 2024"),
        SampleDataItem(name: "Document 2", status: "Inactive", date: "Dec 27, 2024"),
        SampleDataItem(name: "Document 3", status: "Active", date: "Dec 26, 2024"),
        SampleDataItem(name: "Document 4", status: "Active", date: "Dec 25, 2024"),
        SampleDataItem(name: "Document 5", status: "Inactive", date: "Dec 24, 2024"),
        SampleDataItem(name: "Document 6", status: "Active", date: "Dec 23, 2024"),
        SampleDataItem(name: "Document 7", status: "Active", date: "Dec 22, 2024"),
    ]
}

private struct AccessibilityChecklist: View {
    @State private var keyboardTestCompleted = false
    @State private var focusRingTestCompleted = false
    @State private var accessibleNameTestCompleted = false
    @State private var voiceOverTestCompleted = false
    
    var body: some View {
        GroupBox(label: Text("🔍 Accessibility Acceptance Criteria")) {
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                Text("Complete these tests to verify accessibility compliance:")
                    .font(.system(size: DesignTokens.Typography.BodySmall.size, weight: .semibold))
                    .foregroundColor(DesignTokens.Colors.Text.primary)
                    .padding(.bottom, DesignTokens.Spacing.xxs)
                
                AccessibilityCheckItem(
                    isCompleted: $keyboardTestCompleted,
                    title: "Focus Order Test",
                    description: "Tab/Shift-Tab through all controls to verify logical focus order",
                    instruction: "Use Tab key to navigate forward, Shift-Tab to navigate backward"
                )
                
                AccessibilityCheckItem(
                    isCompleted: $focusRingTestCompleted,
                    title: "Focus Ring Visibility",
                    description: "Focused inputs show visible focus ring (not color-only indication)",
                    instruction: "Tab to inputs and buttons - focus ring should be clearly visible"
                )
                
                AccessibilityCheckItem(
                    isCompleted: $accessibleNameTestCompleted,
                    title: "Accessible Names",
                    description: "Every interactive control has accessible name (especially icon-only)",
                    instruction: "Icon-only buttons should announce meaningful names, not just 'button'"
                )
                
                AccessibilityCheckItem(
                    isCompleted: $voiceOverTestCompleted,
                    title: "VoiceOver Smoke Test",
                    description: "VoiceOver announces controls and content correctly",
                    instruction: "Toggle VoiceOver with ⌘F5, navigate with VO+Arrow keys"
                )
                
                // Overall status
                let completedCount = [keyboardTestCompleted, focusRingTestCompleted, accessibleNameTestCompleted, voiceOverTestCompleted].filter { $0 }.count
                let totalCount = 4
                
                HStack {
                    Image(systemName: completedCount == totalCount ? "checkmark.circle.fill" : "exclamationmark.triangle.fill")
                        .foregroundColor(completedCount == totalCount ? DesignTokens.Colors.Accent.green : DesignTokens.Colors.Accent.orange)
                    Text("Accessibility Status: \(completedCount)/\(totalCount) tests completed")
                        .font(.system(size: DesignTokens.Typography.BodySmall.size, weight: .semibold))
                        .foregroundColor(completedCount == totalCount ? DesignTokens.Colors.Accent.green : DesignTokens.Colors.Text.primary)
                }
                .padding(.top, DesignTokens.Spacing.xs)
            }
            .padding(DesignTokens.Spacing.sm)
        }
    }
}

private struct AccessibilityCheckItem: View {
    @Binding var isCompleted: Bool
    let title: String
    let description: String
    let instruction: String
    
    var body: some View {
        HStack(alignment: .top, spacing: DesignTokens.Spacing.xs) {
            Button(action: { isCompleted.toggle() }) {
                Image(systemName: isCompleted ? "checkmark.square.fill" : "square")
                    .foregroundColor(isCompleted ? DesignTokens.Colors.Accent.green : DesignTokens.Colors.Text.tertiary)
                    .font(.system(size: 16))
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Mark \(title) as \(isCompleted ? "incomplete" : "complete")")
            
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                Text(title)
                    .font(.system(size: DesignTokens.Typography.BodySmall.size, weight: .semibold))
                    .foregroundColor(DesignTokens.Colors.Text.primary)
                
                Text(description)
                    .font(.system(size: DesignTokens.Typography.Caption.size))
                    .foregroundColor(DesignTokens.Colors.Text.secondary)
                
                Text("💡 \(instruction)")
                    .font(.system(size: DesignTokens.Typography.Caption.size))
                    .foregroundColor(DesignTokens.Colors.Text.tertiary)
                    .italic()
            }
        }
    }
}

#Preview("Component Gallery - Dark Mode") {
    ComponentGallery(selectedComponent: .button)
        .frame(width: 800, height: 600)
        .environment(\.colorScheme, .dark)
}

#Preview("Component Gallery - High Contrast") {
    ComponentGallery(selectedComponent: .button)
        .frame(width: 800, height: 600)
        .preferredColorScheme(.dark)
        .environment(\.colorScheme, .dark)
}

#Preview("Component Gallery - Large Text") {
    ComponentGallery(selectedComponent: .button)
        .frame(width: 800, height: 600)
        .environment(\.dynamicTypeSize, .accessibility3)
}

#Preview("Component Gallery - Extra Large Text") {
    ComponentGallery(selectedComponent: .button)
        .frame(width: 900, height: 700)
        .environment(\.dynamicTypeSize, .accessibility5)
}

#Preview("Input Gallery - Accessibility") {
    ComponentGallery(selectedComponent: .input)
        .frame(width: 800, height: 600)
        .environment(\.dynamicTypeSize, .accessibility2)
        .environment(\.colorScheme, .dark)
}

#Preview("Card Gallery - High Contrast") {
    ComponentGallery(selectedComponent: .card)
        .frame(width: 800, height: 600)
        .preferredColorScheme(.dark)
        .environment(\.colorScheme, .dark)
}

#Preview("Tokens Gallery - Light Mode") {
    ComponentGallery(selectedComponent: .tokens)
        .frame(width: 800, height: 600)
        .environment(\.colorScheme, .light)
}

#Preview("All Components - Accessibility Test") {
    NavigationSplitView {
        List(ComponentType.allCases, id: \.self) { component in
            Label(component.displayName, systemImage: component.systemImage)
        }
        .navigationTitle("Accessibility Test")
        .frame(minWidth: 200)
    } detail: {
        ScrollView {
            VStack(spacing: DesignTokens.Spacing.md) {
                AccessibilityChecklist()
                ButtonGallery()
                InputGallery()
                CardGallery()
            }
            .padding(DesignTokens.Spacing.md)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(DesignTokens.Colors.Background.primary)
    }
    .frame(width: 1200, height: 800)
    .environment(\.dynamicTypeSize, .accessibility1)
    .environment(\.colorScheme, .dark)
}

#Preview {
    ComponentGallery(selectedComponent: .button)
        .frame(width: 800, height: 600)
}
