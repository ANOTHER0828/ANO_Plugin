//==============================================================================
// ANO_ChangeBackOpacity.js
//------------------------------------------------------------------------------
// Copyright (C)2025 ANOTHER
//------------------------------------------------------------------------------
// Version
// 1.0.0　2025/04/27 プラグイン作成
//==============================================================================

/*:
 * @plugindesc Change window opacity.
 * @author ANOTHER
 * 
 * @param WindowBackOpacity
 * @desc Change window opacity (default: 192)
 * @type number
 * @min 0
 * @max 255
 * @default 192
 * 
 * @help
 * This plugin allows you to freely change the opacity of windows.
 * This plugin does not have any plugin commands.
 * 
 * I hope you will find this plugin useful in your game development.
 * 
 * Terms of Service:
 * Copyright is not transferable
 * Credit notation optional
 * Commercial use allowed
 * Redistribution allowed
 * Modification allowed
 * Can be used in R18 and R18G games
 * 
 * Contact:
 * X (old:Twitter)      : https://twitter.com/another_567/
 * Website              : https://decayedworld.amebaownd.com/
 * Reporting bugs, etc. : https://forms.gle/9Dmm2FZDu6VsxmNT7
 */
/*:ja
 * @plugindesc ウィンドウの不透明度を変更します。
 * @author ANOTHER
 * 
 * @param WindowBackOpacity
 * @text ウィンドウ不透明度
 * @desc ウィンドウの不透明度を変更する (初期値：192)
 * @type number
 * @min 0
 * @max 255
 * @default 192
 * 
 * @help
 * このプラグインを導入するとウィンドウの不透明度を自由に変更できます。
 * このプラグインにはプラグインコマンドはありません。
 * 
 * このプラグインがゲーム制作の役に立てれば幸いです。
 * 
 * 利用規約：
 * 著作権は非譲渡
 * クレジット表記任意
 * 商用利用可能
 * 再配布可能
 * 改変可能
 * R18・R18Gゲームに使用可能
 * 
 * コンタクト:
 * X（旧Twitter） : https://twitter.com/another_567/
 * Webサイト      : https://decayedworld.amebaownd.com/
 * 不具合報告など  : https://forms.gle/9Dmm2FZDu6VsxmNT7
*/

(function(global) {
    'use strict';

//-------------------------------------------------------------------------------
// 範囲制限
//-------------------------------------------------------------------------------

Math.clamp = function(x, min, max) {
    return x < min ? min : (x > max ? max : x);
};

//-------------------------------------------------------------------------------
// パラメータ管理
//-------------------------------------------------------------------------------

const parameters   = PluginManager.parameters('ANO_ChangeBackOpacity');
const ANOWBopacity = Math.clamp(Number(parameters['WindowBackOpacity']), 0, 255);

//-------------------------------------------------------------------------------
// メッセージウィンドウの不透明度を変更する
//-------------------------------------------------------------------------------

const ANO_standerdBackOpacity = Window_Base.prototype.standardBackOpacity;
Window_Base.prototype.standardBackOpacity = function() {
    return ANOWBopacity;
};

})(this);