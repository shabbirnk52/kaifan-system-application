//
//  AppText.swift
//  Adhari
//
//  Created by media phone plus on 7/14/18.
//  Copyright © 2018 media phone plus. All rights reserved.
//

import Foundation
import UIKit
import SwiftUI
class AppText {
    
    static let shared = AppText()
    
    //For Text-Replacement use %@
    var defaults = UserDefaults.standard
    
    fileprivate var currentLanguage: String = lang.en
    
{[CONTENT]}
    
    //implementation for font may be required for arabic language
    func getLocalizedText(key:String) -> String  {
        var value : String = ""
        
        if lang.ar == currentLanguage {
            value = key.localized(code:  lang.ar)
        }
        else {
            value = key.localized(code:  lang.en)
        }
        
        if value.count == 0 {
            printlog( "AppNotifications",  "create",   "key \(key) not found")
        }
        
        return value
        
    }
    
    
    func getLanguage() {
        let key = "lang"
        
        let code =  defaults.string(forKey: key)
        
        //default language is english
        if code == nil {
            setLanguage(code: lang.en)
        }
        else if code ==  lang.en {
            setLanguage(code: lang.en)
        }
        else {
            setLanguage(code: lang.ar)
        }
        
    }
    
    func setLanguage(code:String) {
        let key = "lang"
        defaults.set(code, forKey: key)
        self.defaults.synchronize()
        setLayoutDirection(code: code)
    }
    
    func setLayoutDirection(code:String) {
        
        if code == lang.en {
            printlog("forceLeftTo Right")
            UIView.appearance().semanticContentAttribute = .forceLeftToRight
            UINavigationController().navigationBar.semanticContentAttribute = .forceLeftToRight
            UISearchBar.appearance().semanticContentAttribute = .forceLeftToRight
            if let keyWindow = UIWindow.key {
                keyWindow.rootViewController?.view.semanticContentAttribute = .forceLeftToRight
                keyWindow.semanticContentAttribute = .forceLeftToRight
            }
            currentLanguage = lang.en
        }
        else {
            printlog("forceRightTo Left")
            
            UIView.appearance().semanticContentAttribute = .forceRightToLeft
            UINavigationController().navigationBar.semanticContentAttribute = .forceRightToLeft
            UISearchBar.appearance().semanticContentAttribute = .forceRightToLeft
            if let keyWindow = UIWindow.key {
                keyWindow.rootViewController?.view.semanticContentAttribute = .forceRightToLeft
                keyWindow.semanticContentAttribute = .forceRightToLeft
            }
            currentLanguage = lang.ar
        }
    }
    
    
    func isArabic()-> Bool {
        if lang.ar == currentLanguage {
            // print("Arabic Language")
            return true
        } else {
            // print("English Language")
            return false
        }
    }
        
}



extension String {
    
    func localized(code:String) -> String {
        
        guard let path = Bundle.main.path(forResource: code, ofType: "lproj") else {
            return "not found:\(code)"
        }
        
        if let bundle = Bundle(path: path) {
            return NSLocalizedString(self, tableName: nil, bundle: bundle, value: "", comment: "")
        }
        else {
            return "not available key:\(code)"
        }
        
    }
    
}



extension UIWindow {
    static var key: UIWindow? {
        if #available(iOS 13, *) {
            return UIApplication.shared.windows.first { $0.isKeyWindow }
        } else {
            return UIApplication.shared.keyWindow
        }
    }
}
