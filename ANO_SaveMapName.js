//==============================================================================
// ANO_SaveMapName.js
//------------------------------------------------------------------------------
// (C)2025 ANOTHER
//------------------------------------------------------------------------------
// Version
// 1.0.0　2025/04/25 プラグイン公開
//==============================================================================

/*:
 * @plugindesc Customize the save screen.
 * @author ANOTHER
 * 
 * @param VisibleSavefiles
 * @desc Change the number of save files displayed on screen
 * (Number of options available:3～5)
 * @type select
 * @option 3 files
 * @value 3
 * @option 4 files
 * @value 4
 * @option 5 files
 * @value 5
 * @default 5
 * @parent otherType
 * 
 * @param GameTitleDisplay
 * @desc Change the game title display 
 * (true:display false:hidden)
 * @type boolean
 * @true display
 * @false hidden
 * @default false
 * 
 * @param DateDisplay
 * @desc Change the date display 
 * (true:display false:hidden)
 * @type boolean
 * @true display
 * @false hidden
 * @default true
 * 
 * @param MapNameDisplay
 * @desc Change the map name display 
 * (true:display false:hidden)
 * @type boolean
 * @true display
 * @false hidden
 * @default true
 * 
 * @param MapNamePosition
 * @desc Change the position of the map name 
 * (1:top left 2:top right)
 * @type select
 * @option top left
 * @value 1
 * @option top right
 * @value 2
 * @default 1
 * @parent otherType
 * 
 * @help
 * By installing this plugin you can make various changes to the save screen.
 * This plugin does not have any plugin commands.
 * 
 * I hope you will find this plugin useful in your game development.
 * 
 * Terms of Service:
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
 * @plugindesc セーブ画面をカスタマイズします。
 * @author ANOTHER
 * 
 * @param VisibleSavefiles
 * @text 表示セーブファイル数
 * @desc 画面に表示されるセーブファイルの数を変更する
 * (選択可能数:3～5)
 * @type select
 * @option ファイル3つ
 * @value 3
 * @option ファイル4つ
 * @value 4
 * @option ファイル5つ
 * @value 5
 * @default 5
 * @parent otherType
 * 
 * @param GameTitleDisplay
 * @text ゲームタイトルの表示
 * @desc ゲームタイトルの表示を変更する (true:表示 false:非表示)
 * @type boolean
 * @true 表示
 * @false 非表示
 * @default false
 * 
 * @param DateDisplay
 * @text 日付の表示
 * @desc 日付の表示を変更する (true:表示 false:非表示)
 * @type boolean
 * @true 表示
 * @false 非表示
 * @default true
 * 
 * @param MapNameDisplay
 * @text マップ名の表示
 * @desc マップ名の表示を変更する (true:表示 false:非表示)
 * @type boolean
 * @true 表示
 * @false 非表示
 * @default true
 * 
 * @param MapNamePosition
 * @text マップ名の位置
 * @desc マップの位置を変更する (1:左上 2:右上）
 * @type select
 * @option 左上
 * @value 1
 * @option 右上
 * @value 2
 * @default 1
 * @parent otherType
 * 
 * @help
 * このプラグインを導入するとセーブ画面に様々な変更を加えることができます。
 * このプラグインにはプラグインコマンドはありません。
 * 
 * このプラグインがゲーム制作の役に立てれば幸いです。
 * 
 * 利用規約：
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
// パラメータ管理
//-------------------------------------------------------------------------------

const parameters     = PluginManager.parameters('ANO_SaveMapName');
const ANOSaveFile    = Number(parameters['VisibleSavefiles']);
const ANOTitle       = parameters['GameTitleDisplay'] === 'true';
const ANODate        = parameters['DateDisplay'] === 'true';
const ANOMapName     = parameters['MapNameDisplay'] === 'true';
const ANOMapPosition = Number(parameters['MapNamePosition']);

//-------------------------------------------------------------------------------
// セーブ時にマップ名を保存する
//-------------------------------------------------------------------------------

const ANO_DataManager_makeSaveInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {

    const info = ANO_DataManager_makeSaveInfo.call(this);

    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
    info.mapname    = $gameMap.displayName();
    return info;
};

//-------------------------------------------------------------------------------
// 画面表示セーブファイル数を変更する
//-------------------------------------------------------------------------------

const ANO_SavefileList_maxVisibleItems = Window_SavefileList.prototype.maxVisibleItems;
Window_SavefileList.prototype.maxVisibleItems = function() {

    if(ANOSaveFile == 3) {
        return 3;
    } else if(ANOSaveFile == 4) {
        return 4;
    } else if(ANOSaveFile == 5) {
        return 5;
    } else {
        return 5;
    }
};

//-------------------------------------------------------------------------------
// 日付取得
//-------------------------------------------------------------------------------

Window_SavefileList.prototype.formatDate = function(date) {
    const year    = date.getFullYear();
    const month   = this.padZero(date.getMonth() + 1);
    const day     = this.padZero(date.getDate());
    const hours   = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    return `${year}/${month}/${day} ${hours}:${minutes}`;
};

Window_SavefileList.prototype.padZero = function(n) {
    return n < 10 ? '0' + n : '' + n;
};

//-------------------------------------------------------------------------------
// セーブファイルにゲームタイトル・マップ名・日付・時間を描画する
//-------------------------------------------------------------------------------

// セーブファイル1個ぶんを描く関数
const ANO_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
Window_SavefileList.prototype.drawContents = function(info, rect, valid) {

    // ここで「測定用ダミーウィンドウ」が無ければ作る
    if(!this._measureWindow) {
        this._measureWindow = new Window_Base(new Rectangle(0, 0, 0, 0));
    }

    // このtitleWidthは、測定用ウィンドウでゲームタイトルの文字幅を測る関数
    const titleWidth = this._measureWindow.textWidth($dataSystem.gameTitle);
    const bottom = rect.y + rect.height;
    const titleX = rect.x + 192;
    const titleX2 = ANOTitle ? titleWidth + 30 : 0;
    const mapNameX = titleX + titleX2;
    const mapNameWidth = rect.width - (mapNameX - rect.x);

    if(rect.width >= 420) {
        if(valid) {

            // 歩行グラフィック表示
            this.drawPartyCharacters(info, rect.x + 220, bottom - 4);
            
            // ゲームタイトル描画制御
            if(ANOTitle) {
                const colon = (ANOMapPosition == 1) ? ':' : '';
                this.drawText(info.title + colon, titleX, rect.y, rect.width - 192);
            }
            
            // ゲームタイトル・マップ名の表示変更
            if(ANOMapName) {
                if(ANOMapPosition == 1) {
                    // 左上に表示(タイトルの右隣)
                    this.drawText(info.mapname || '', mapNameX, rect.y, mapNameWidth);
                } else if(ANOMapPosition == 2) {
                    // 右上に表示
                    this.drawText(info.mapname || '', rect.x, rect.y, rect.width, 'right');
                }
            }
        }
        const lineHeight = this.lineHeight();
        const y2 = bottom - lineHeight;
        const date = new Date(info.timestamp);
        const dateString = this.formatDate(date);
        const dateY = y2 - lineHeight;

        // プレイ時間と日付の描画制御
        if(y2 >= lineHeight) {
            this.drawText(info.playtime, rect.x, y2, rect.width, 'right');
            if(ANODate) {
                this.drawText(dateString, rect.x, dateY, rect.width, 'right');
            }
        }
    }
};

})(this);