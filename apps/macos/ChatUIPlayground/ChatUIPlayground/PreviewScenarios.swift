//
//  PreviewScenarios.swift
//  ChatUIPlayground
//
//  Created by Jamie Scott Craik on 28-12-2025.
//

import SwiftUI
import ChatUISwift

// MARK: - Preview Scenarios Helper

/// Helper for creating consistent preview variants across components
/// Provides standardized accessibility state testing and variant display
public struct PreviewScenarios<Content: View>: View {
    let title: String
    let content: () -> Content
    
    public init(_ title: String, @ViewBuilder content: @escaping () -> Content) {
        self.title = title
        self.content = content
    }
    
    public var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
            Text(title)
                .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                .foregroundColor(DesignTokens.Colors.Text.primary)
            
            content()
        }
        .padding(DesignTokens.Spacing.md)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(DesignTokens.Colors.Background.primary)
    }
}

/// Accessibility variant helper for consistent testing
public struct AccessibilityVariants<Content: View>: View {
    let content: () -> Content
    
    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }
    
    public var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.lg) {
            // Default state
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                Text("Default")
                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                content()
            }
            
            // High contrast state
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                Text("High Contrast")
                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                content()
                    .accessibilityHighContrast()
            }
            
            // Focus ring state
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                Text("Focus Ring")
                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                content()
                    .accessibilityFocusRing()
            }
        }
    }
}

// MARK: - Component Variant Helpers

/// Button variant helper for consistent display
public struct ButtonVariants: View {
    public init() {}
    
    public var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
            // All variants
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
            
            // All sizes
            HStack(spacing: DesignTokens.Spacing.smXs) {
                ChatUIButton("Small", variant: .default, size: .sm) {}
                ChatUIButton("Default", variant: .default, size: .default) {}
                ChatUIButton("Large", variant: .default, size: .lg) {}
            }
            
            // Icon buttons with proper accessibility
            HStack(spacing: DesignTokens.Spacing.smXs) {
                ChatUIButton(
                    systemName: "heart.fill",
                    variant: .default,
                    size: .icon,
                    accessibilityLabel: "Add to favorites",
                    accessibilityHint: "Adds this item to your favorites list"
                ) {}
                ChatUIButton(
                    systemName: "trash",
                    variant: .destructive,
                    size: .icon,
                    accessibilityLabel: "Delete item",
                    accessibilityHint: "Permanently removes this item"
                ) {}
                ChatUIButton(
                    systemName: "square.and.arrow.up",
                    variant: .secondary,
                    size: .icon,
                    accessibilityLabel: "Share",
                    accessibilityHint: "Opens sharing options for this item"
                ) {}
            }
        }
    }
}

/// Input variant helper for consistent display
public struct InputVariants: View {
    @State private var defaultText = ""
    @State private var searchText = ""
    @State private var passwordText = ""
    
    public init() {}
    
    public var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
            // All variants
            ChatUIInput(
                text: $defaultText,
                placeholder: "Default input",
                variant: .default,
                accessibilityLabel: "Default text input",
                accessibilityHint: "Enter text here"
            )
            
            ChatUIInput(
                text: $searchText,
                placeholder: "Search...",
                variant: .search,
                accessibilityLabel: "Search field",
                accessibilityHint: "Type to search content",
                submitLabel: .search
            )
            
            ChatUIInput(
                text: $passwordText,
                placeholder: "Password",
                variant: .password,
                accessibilityLabel: "Password field",
                accessibilityHint: "Enter your password securely",
                submitLabel: .done
            )
            
            // All sizes
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                ChatUIInput(
                    text: .constant(""),
                    placeholder: "Small input",
                    size: .sm,
                    accessibilityLabel: "Small text input"
                )
                ChatUIInput(
                    text: .constant(""),
                    placeholder: "Default input",
                    size: .default,
                    accessibilityLabel: "Default text input"
                )
                ChatUIInput(
                    text: .constant(""),
                    placeholder: "Large input",
                    size: .lg,
                    accessibilityLabel: "Large text input"
                )
            }
        }
    }
}

/// Card variant helper for consistent display
public struct CardVariants: View {
    public init() {}
    
    public var body: some View {
        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
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
    }
}

// MARK: - Original Preview Scenarios

/// Collection of realistic UI scenarios using ChatUISwift components
/// These can be used for testing and demonstration purposes

struct PreviewScenarioExamples {

    // MARK: - Chat Message Scenario

    struct ChatMessageScenario: View {
        var body: some View {
            VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                ChatUICard(variant: .elevated) {
                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                        HStack {
                            Image(systemName: "person.circle.fill")
                                .font(.system(size: 24))
                                .foregroundColor(DesignTokens.Colors.Accent.blue)
                            VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                                Text("Assistant")
                                    .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                                Text("2 min ago")
                                    .font(.system(size: DesignTokens.Typography.Caption.size))
                                    .foregroundColor(DesignTokens.Colors.Text.tertiary)
                            }
                            Spacer()
                        }
                        Text("Hello! How can I help you today?")
                            .font(.system(size: DesignTokens.Typography.Body.size))
                            .foregroundColor(DesignTokens.Colors.Text.primary)
                    }
                }

                ChatUICard(variant: .default) {
                    HStack {
                        Spacer()
                        VStack(alignment: .trailing, spacing: DesignTokens.Spacing.xs) {
                            Text("I need help with SwiftUI")
                                .font(.system(size: DesignTokens.Typography.Body.size))
                                .foregroundColor(DesignTokens.Colors.Text.primary)
                            Text("1 min ago")
                                .font(.system(size: DesignTokens.Typography.Caption.size))
                                .foregroundColor(DesignTokens.Colors.Text.tertiary)
                        }
                        Spacer()
                    }
                }
            }
            .padding(DesignTokens.Spacing.sm)
        }
    }

    // MARK: - Form Scenario

    struct FormScenario: View {
        @State private var name = ""
        @State private var email = ""
        @State private var password = ""

        var body: some View {
            ChatUICard(variant: .elevated) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.mdSm) {
                    Text("Sign Up")
                        .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))

                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                        Text("Name")
                            .font(.system(size: DesignTokens.Typography.BodySmall.size, weight: DesignTokens.Typography.BodySmall.emphasisWeight))
                        ChatUIInput(
                            text: $name,
                            placeholder: "Enter your name",
                            variant: .default
                        )
                    }

                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                        Text("Email")
                            .font(.system(size: DesignTokens.Typography.BodySmall.size, weight: DesignTokens.Typography.BodySmall.emphasisWeight))
                        ChatUIInput(
                            text: $email,
                            placeholder: "Enter your email",
                            variant: .default
                        )
                    }

                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.smXs) {
                        Text("Password")
                            .font(.system(size: DesignTokens.Typography.BodySmall.size, weight: DesignTokens.Typography.BodySmall.emphasisWeight))
                        ChatUIInput(
                            text: $password,
                            placeholder: "Create a password",
                            variant: .password
                        )
                    }

                    HStack(spacing: DesignTokens.Spacing.smXs) {
                        ChatUIButton("Sign Up", variant: .default) {}
                        ChatUIButton("Cancel", variant: .ghost) {}
                    }
                }
            }
            .padding(DesignTokens.Spacing.sm)
        }
    }

    // MARK: - Search Bar Scenario

    struct SearchBarScenario: View {
        @State private var searchText = ""

        var body: some View {
            HStack(spacing: DesignTokens.Spacing.smXs) {
                ChatUIInput(
                    text: $searchText,
                    placeholder: "Search...",
                    variant: .search
                )
                ChatUIButton(
                    systemName: "magnifyingglass",
                    variant: .default,
                    size: .icon,
                    accessibilityLabel: "Search"
                ) {}
            }
            .padding(DesignTokens.Spacing.sm)
        }
    }

    // MARK: - Action Card Scenario

    struct ActionCardScenario: View {
        var body: some View {
            ChatUICard(variant: .elevated) {
                HStack(spacing: DesignTokens.Spacing.sm) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .font(.system(size: 32))
                        .foregroundColor(DesignTokens.Colors.Accent.orange)

                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                        Text("Action Required")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        Text("Please review your account settings to ensure everything is up to date.")
                            .font(.system(size: DesignTokens.Typography.BodySmall.size))
                            .foregroundColor(DesignTokens.Colors.Text.secondary)
                    }

                    Spacer()

                    ChatUIButton("Review", variant: .default, size: .sm) {}
                }
            }
            .padding(DesignTokens.Spacing.sm)
        }
    }

    // MARK: - Confirmation Dialog Scenario

    struct ConfirmationDialogScenario: View {
        var body: some View {
            ChatUICard(variant: .elevated) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.mdSm) {
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 28))
                            .foregroundColor(DesignTokens.Colors.Accent.green)
                        Text("Success")
                            .font(.system(size: DesignTokens.Typography.Heading2.size, weight: DesignTokens.Typography.Heading2.weight))
                        Spacer()
                    }

                    Text("Your changes have been saved successfully.")
                        .font(.system(size: DesignTokens.Typography.Body.size))
                        .foregroundColor(DesignTokens.Colors.Text.secondary)

                    HStack(spacing: DesignTokens.Spacing.smXs) {
                        ChatUIButton("OK", variant: .default) {}
                        ChatUIButton("View Details", variant: .outline) {}
                    }
                }
            }
            .frame(width: 400)
            .padding(DesignTokens.Spacing.sm)
        }
    }

    // MARK: - User Profile Scenario

    struct UserProfileScenario: View {
        var body: some View {
            ChatUICard(variant: .elevated) {
                HStack(spacing: DesignTokens.Spacing.sm) {
                    Image(systemName: "person.circle.fill")
                        .font(.system(size: 48))
                        .foregroundColor(DesignTokens.Colors.Accent.blue)

                    VStack(alignment: .leading, spacing: DesignTokens.Spacing.xxxs) {
                        Text("John Doe")
                            .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                        Text("Software Engineer")
                            .font(.system(size: DesignTokens.Typography.BodySmall.size))
                            .foregroundColor(DesignTokens.Colors.Text.secondary)
                        Text("john.doe@example.com")
                            .font(.system(size: DesignTokens.Typography.Caption.size))
                            .foregroundColor(DesignTokens.Colors.Text.tertiary)
                    }

                    Spacer()

                    VStack(spacing: DesignTokens.Spacing.xxs) {
                        ChatUIButton(
                            systemName: "pencil",
                            variant: .secondary,
                            size: .icon,
                            accessibilityLabel: "Edit profile"
                        ) {}
                        ChatUIButton(
                            systemName: "gear",
                            variant: .ghost,
                            size: .icon,
                            accessibilityLabel: "Profile settings"
                        ) {}
                    }
                }
            }
            .padding(DesignTokens.Spacing.sm)
        }
    }

    // MARK: - Stats Card Scenario

    struct StatsCardScenario: View {
        var body: some View {
            HStack(spacing: DesignTokens.Spacing.sm) {
                StatCard(
                    title: "Messages",
                    value: "1,234",
                    icon: "message.fill",
                    color: DesignTokens.Colors.Accent.blue
                )
                StatCard(
                    title: "Users",
                    value: "567",
                    icon: "person.fill",
                    color: DesignTokens.Colors.Accent.green
                )
                StatCard(
                    title: "Errors",
                    value: "12",
                    icon: "exclamationmark.triangle.fill",
                    color: DesignTokens.Colors.Accent.red
                )
            }
            .padding(DesignTokens.Spacing.sm)
        }
    }

    private struct StatCard: View {
        let title: String
        let value: String
        let icon: String
        let color: Color

        var body: some View {
            ChatUICard(variant: .elevated) {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.xs) {
                    HStack {
                        Image(systemName: icon)
                            .foregroundColor(color)
                        Spacer()
                    }
                    Text(value)
                        .font(.system(size: DesignTokens.Typography.Heading1.size, weight: DesignTokens.Typography.Heading1.weight))
                        .foregroundColor(DesignTokens.Colors.Text.primary)
                    Text(title)
                        .font(.system(size: DesignTokens.Typography.BodySmall.size))
                        .foregroundColor(DesignTokens.Colors.Text.secondary)
                }
            }
        }
    }
}

// MARK: - Previews

private struct PreviewScenarioContainer<Content: View>: View {
    let width: CGFloat?
    let height: CGFloat?
    let content: Content

    init(width: CGFloat? = nil, height: CGFloat? = nil, @ViewBuilder content: () -> Content) {
        self.width = width
        self.height = height
        self.content = content()
    }

    var body: some View {
        content
            .frame(width: width, height: height)
            .padding(DesignTokens.Spacing.sm)
            .background(DesignTokens.Colors.Background.secondary)
    }
}

#Preview("Chat Messages") {
    PreviewScenarioContainer(width: 500, height: 300) {
        PreviewScenarioExamples.ChatMessageScenario()
    }
}

#Preview("Form") {
    PreviewScenarioContainer(width: 450) {
        PreviewScenarioExamples.FormScenario()
    }
}

#Preview("Search Bar") {
    PreviewScenarioContainer(width: 500) {
        PreviewScenarioExamples.SearchBarScenario()
    }
}

#Preview("Action Card") {
    PreviewScenarioContainer(width: 500) {
        PreviewScenarioExamples.ActionCardScenario()
    }
}

#Preview("Confirmation Dialog") {
    PreviewScenarioContainer {
        PreviewScenarioExamples.ConfirmationDialogScenario()
    }
}

#Preview("User Profile") {
    PreviewScenarioContainer(width: 450) {
        PreviewScenarioExamples.UserProfileScenario()
    }
}

#Preview("Stats Cards") {
    PreviewScenarioContainer(width: 800) {
        PreviewScenarioExamples.StatsCardScenario()
    }
}

#Preview("Form - High Contrast") {
    PreviewScenarioContainer(width: 450) {
        PreviewScenarioExamples.FormScenario()
    }
    .preferredColorScheme(.dark)
    .environment(\.colorScheme, .dark)
}

#Preview("Form - Dynamic Type") {
    PreviewScenarioContainer(width: 450) {
        PreviewScenarioExamples.FormScenario()
    }
    .environment(\.dynamicTypeSize, .accessibility3)
}

#Preview("Form - Dark Mode") {
    PreviewScenarioContainer(width: 450) {
        PreviewScenarioExamples.FormScenario()
    }
    .environment(\.colorScheme, .dark)
}

// MARK: - Accessibility Preview Variants

#Preview("Button Variants - All States") {
    PreviewScenarios("Button Variants") {
        AccessibilityVariants {
            ButtonVariants()
        }
    }
    .frame(width: 600, height: 800)
}

#Preview("Input Variants - All States") {
    PreviewScenarios("Input Variants") {
        AccessibilityVariants {
            InputVariants()
        }
    }
    .frame(width: 600, height: 800)
}

#Preview("Card Variants - All States") {
    PreviewScenarios("Card Variants") {
        AccessibilityVariants {
            CardVariants()
        }
    }
    .frame(width: 600, height: 800)
}

#Preview("Button Variants - High Contrast") {
    PreviewScenarios("Button Variants - High Contrast") {
        ButtonVariants()
            .accessibilityHighContrast()
    }
    .frame(width: 600, height: 400)
    .preferredColorScheme(.dark)
    .environment(\.colorScheme, .dark)
}

#Preview("Input Variants - Large Text") {
    PreviewScenarios("Input Variants - Large Text") {
        InputVariants()
    }
    .frame(width: 600, height: 500)
    .environment(\.dynamicTypeSize, .accessibility3)
}

#Preview("Card Variants - Extra Large Text") {
    PreviewScenarios("Card Variants - Extra Large Text") {
        CardVariants()
    }
    .frame(width: 700, height: 600)
    .environment(\.dynamicTypeSize, .accessibility5)
}

#Preview("All Components - Accessibility Test") {
    ScrollView {
        VStack(spacing: DesignTokens.Spacing.lg) {
            PreviewScenarios("Accessibility Test Suite") {
                VStack(alignment: .leading, spacing: DesignTokens.Spacing.md) {
                    Text("🔍 Test all components for accessibility compliance")
                        .font(.system(size: DesignTokens.Typography.Body.size))
                        .foregroundColor(DesignTokens.Colors.Text.secondary)
                    
                    AccessibilityVariants {
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                            Text("Buttons")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            ButtonVariants()
                        }
                    }
                    
                    AccessibilityVariants {
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                            Text("Inputs")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            InputVariants()
                        }
                    }
                    
                    AccessibilityVariants {
                        VStack(alignment: .leading, spacing: DesignTokens.Spacing.sm) {
                            Text("Cards")
                                .font(.system(size: DesignTokens.Typography.Heading3.size, weight: DesignTokens.Typography.Heading3.weight))
                            CardVariants()
                        }
                    }
                }
            }
        }
    }
    .frame(width: 1000, height: 1200)
    .environment(\.dynamicTypeSize, .accessibility1)
    .environment(\.colorScheme, .dark)
}
