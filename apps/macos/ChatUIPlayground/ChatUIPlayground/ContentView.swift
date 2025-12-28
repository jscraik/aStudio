//
//  ContentView.swift
//  ChatUIPlayground
//
//  Created by Jamie Scott Craik on 28-12-2025.
//

import SwiftUI
import ChatUISwift

struct ContentView: View {
    @State private var selectedComponent: ComponentType = .button

    var body: some View {
        NavigationSplitView {
            // Sidebar with component list
            List(ComponentType.allCases, id: \.self, selection: $selectedComponent) { component in
                Label(component.displayName, systemImage: component.systemImage)
                    .tag(component)
            }
            .navigationTitle("Components")
            .frame(minWidth: 200)
        } detail: {
            // Main content area
            ComponentGallery(selectedComponent: selectedComponent)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(DesignTokens.Colors.Background.primary)
        }
    }
}

enum ComponentType: String, CaseIterable {
    case button = "button"
    case input = "input"
    case card = "card"
    case modal = "modal"
    case navigation = "navigation"
    case toast = "toast"
    case dataDisplay = "dataDisplay"
    case tokens = "tokens"

    var displayName: String {
        switch self {
        case .button:
            return "Button"
        case .input:
            return "Input"
        case .card:
            return "Card"
        case .modal:
            return "Modal & Dialogs"
        case .navigation:
            return "Navigation"
        case .toast:
            return "Toast & Notifications"
        case .dataDisplay:
            return "Data Display"
        case .tokens:
            return "Design Tokens"
        }
    }

    var systemImage: String {
        switch self {
        case .button:
            return "button.programmable"
        case .input:
            return "textfield"
        case .card:
            return "rectangle"
        case .modal:
            return "macwindow"
        case .navigation:
            return "sidebar.left"
        case .toast:
            return "bell"
        case .dataDisplay:
            return "tablecells"
        case .tokens:
            return "paintpalette"
        }
    }
}

#Preview {
    ContentView()
        .frame(width: 1000, height: 700)
}
