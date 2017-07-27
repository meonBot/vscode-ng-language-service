/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgLocalization} from '@angular/common';
import {ResourceLoader} from '@angular/compiler';
import {MessageBundle} from '@angular/compiler/src/i18n/message_bundle';
import {Xliff2} from '@angular/compiler/src/i18n/serializers/xliff2';
import {HtmlParser} from '@angular/compiler/src/ml_parser/html_parser';
import {DEFAULT_INTERPOLATION_CONFIG} from '@angular/compiler/src/ml_parser/interpolation_config';
import {DebugElement, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {expect} from '@angular/platform-browser/testing/src/matchers';

import {SpyResourceLoader} from '../spies';

import {FrLocalization, HTML, I18nComponent, validateHtml} from './integration_common';

export function main() {
  describe('i18n XLIFF 2.0 integration spec', () => {

    beforeEach(async(() => {
      TestBed.configureCompiler({
        providers: [
          {provide: ResourceLoader, useClass: SpyResourceLoader},
          {provide: NgLocalization, useClass: FrLocalization},
          {provide: TRANSLATIONS, useValue: XLIFF2_TOMERGE},
          {provide: TRANSLATIONS_FORMAT, useValue: 'xlf2'},
        ]
      });

      TestBed.configureTestingModule({declarations: [I18nComponent]});
    }));

    it('should extract from templates', () => {
      const catalog = new MessageBundle(new HtmlParser, [], {});
      const serializer = new Xliff2();
      catalog.updateFromTemplate(HTML, 'file.ts', DEFAULT_INTERPOLATION_CONFIG);

      expect(catalog.write(serializer)).toContain(XLIFF2_EXTRACTED);
    });

    it('should translate templates', () => {
      const tb: ComponentFixture<I18nComponent> =
          TestBed.overrideTemplate(I18nComponent, HTML).createComponent(I18nComponent);
      const cmp: I18nComponent = tb.componentInstance;
      const el: DebugElement = tb.debugElement;

      validateHtml(tb, cmp, el);
    });
  });
}

const XLIFF2_TOMERGE = `
      <unit id="615790887472569365">
      <segment>
        <source>i18n attribute on tags</source>
        <target>attributs i18n sur les balises</target>
      </segment>
    </unit>
    <unit id="3707494640264351337">
      <segment>
        <source>nested</source>
        <target>imbriqué</target>
      </segment>
    </unit>
    <unit id="5539162898278769904">
      <segment>
        <source>nested</source>
        <target>imbriqué</target>
      </segment>
    </unit>
    <unit id="3780349238193953556">
      <segment>
        <source><pc id="0" equivStart="START_ITALIC_TEXT" equivEnd="CLOSE_ITALIC_TEXT" type="fmt" dispStart="&lt;i&gt;" dispEnd="&lt;/i&gt;">with placeholders</pc></source>
        <target><pc id="0" equivStart="START_ITALIC_TEXT" equivEnd="CLOSE_ITALIC_TEXT" type="fmt" dispStart="&lt;i&gt;" dispEnd="&lt;/i&gt;">avec des espaces réservés</pc></target>
      </segment>
    </unit>
    <unit id="5525133077318024839">
      <segment>
        <source>on not translatable node</source>
        <target>sur des balises non traductibles</target>
      </segment>
    </unit>
    <unit id="8670732454866344690">
      <segment>
        <source>on translatable node</source>
        <target>sur des balises traductibles</target>
      </segment>
    </unit>
    <unit id="4593805537723189714">
      <segment>
        <source>{VAR_PLURAL, plural, =0 {zero} =1 {one} =2 {two} other {<pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">many</pc>} }</source>
        <target>{VAR_PLURAL, plural, =0 {zero} =1 {un} =2 {deux} other {<pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">beaucoup</pc>} }</target>
      </segment>
    </unit>
    <unit id="4360321700965841752">
      <segment>
        <source>
        <ph id="0" equiv="ICU" disp="{sex, select, 0 {...} m {...} f {...}}"/>
    </source>
        <target><ph id="0" equiv="ICU" disp="{sex, select, 0 {...} m {...} f {...}}"/></target>
      </segment>
    </unit>
    <unit id="5460933846928880074">
      <notes>
        <note category="location">file.ts:23</note>
      </notes>
      <segment>
        <source>{VAR_SELECT, select, 0 {other} m {male} f {female} }</source>
        <target>{VAR_SELECT, select, 0 {autre} m {homme} f {femme} }</target>
      </segment>
    </unit>
    <unit id="1746565782635215">
      <notes>
        <note category="location">file.ts:25,27</note>
      </notes>
      <segment>
        <source>
        <ph id="0" equiv="ICU" disp="{sexB, select, m {...} f {...}}"/>
    </source>
      <target><ph id="0" equiv="ICU" disp="{sexB, select, m {...} f {...}}"/></target>
      </segment>
    </unit>
    <unit id="5868084092545682515">
      <segment>
        <source>{VAR_SELECT, select, m {male} f {female} }</source>
        <target>{VAR_SELECT, select, m {homme} f {femme} }</target>
      </segment>
    </unit>
    <unit id="4851788426695310455">
      <segment>
        <source><ph id="0" equiv="INTERPOLATION" disp="{{ &quot;count = &quot; + count }}"/></source>
        <target><ph id="0" equiv="INTERPOLATION" disp="{{ &quot;count = &quot; + count }}"/></target>
      </segment>
    </unit>
    <unit id="9013357158046221374">
      <segment>
        <source>sex = <ph id="0" equiv="INTERPOLATION" disp="{{ sex }}"/></source>
        <target>sexe = <ph id="0" equiv="INTERPOLATION" disp="{{ sex }}"/></target>
      </segment>
    </unit>
    <unit id="8324617391167353662">
      <segment>
        <source><ph id="0" equiv="CUSTOM_NAME" disp="{{ &quot;custom name&quot; //i18n(ph=&quot;CUSTOM_NAME&quot;) }}"/></source>
        <target><ph id="0" equiv="CUSTOM_NAME" disp="{{ &quot;custom name&quot; //i18n(ph=&quot;CUSTOM_NAME&quot;) }}"/></target>
      </segment>
    </unit>
    <unit id="7685649297917455806">
      <segment>
        <source>in a translatable section</source>
        <target>dans une section traductible</target>
      </segment>
    </unit>
    <unit id="2387287228265107305">
      <segment>
        <source>
    <pc id="0" equivStart="START_HEADING_LEVEL1" equivEnd="CLOSE_HEADING_LEVEL1" type="other" dispStart="&lt;h1&gt;" dispEnd="&lt;/h1&gt;">Markers in html comments</pc>   
    <pc id="1" equivStart="START_TAG_DIV" equivEnd="CLOSE_TAG_DIV" type="other" dispStart="&lt;div&gt;" dispEnd="&lt;/div&gt;"></pc>
    <pc id="2" equivStart="START_TAG_DIV_1" equivEnd="CLOSE_TAG_DIV" type="other" dispStart="&lt;div&gt;" dispEnd="&lt;/div&gt;"><ph id="3" equiv="ICU" disp="{count, plural, =0 {...} =1 {...} =2 {...} other {...}}"/></pc>
</source>
        <target>
    <pc id="0" equivStart="START_HEADING_LEVEL1" equivEnd="CLOSE_HEADING_LEVEL1" type="other" dispStart="&lt;h1&gt;" dispEnd="&lt;/h1&gt;">Balises dans les commentaires html</pc>   
    <pc id="1" equivStart="START_TAG_DIV" equivEnd="CLOSE_TAG_DIV" type="other" dispStart="&lt;div&gt;" dispEnd="&lt;/div&gt;"></pc>
    <pc id="2" equivStart="START_TAG_DIV_1" equivEnd="CLOSE_TAG_DIV" type="other" dispStart="&lt;div&gt;" dispEnd="&lt;/div&gt;"><ph id="3" equiv="ICU" disp="{count, plural, =0 {...} =1 {...} =2 {...} other {...}}"/></pc>
</target>
      </segment>
    </unit>
    <unit id="1491627405349178954">
      <segment>
        <source>it <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">should</pc> work</source>
        <target>ca <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">devrait</pc> marcher</target>
      </segment>
    </unit>
    <unit id="i18n16">
      <segment>
        <source>with an explicit ID</source>
        <target>avec un ID explicite</target>
      </segment>
    </unit>
    <unit id="i18n17">
      <segment>
        <source>{VAR_PLURAL, plural, =0 {zero} =1 {one} =2 {two} other {<pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">many</pc>} }</source>
        <target>{VAR_PLURAL, plural, =0 {zero} =1 {un} =2 {deux} other {<pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">beaucoup</pc>} }</target>
      </segment>
    </unit>
    <unit id="4085484936881858615">
      <segment>
        <source>{VAR_PLURAL, plural, =0 {Found no results} =1 {Found one result} other {Found <ph id="0" equiv="INTERPOLATION" disp="{{response.getItemsList().length}}"/> results} }</source>
        <target>{VAR_PLURAL, plural, =0 {Pas de réponse} =1 {une réponse} other {Trouvé <ph id="0" equiv="INTERPOLATION" disp="{{response.getItemsList().length}}"/> réponses} }</target>
      </segment>
    </unit>
    <unit id="4035252431381981115">
      <segment>
        <source>foo<pc id="0" equivStart="START_LINK" equivEnd="CLOSE_LINK" type="link" dispStart="&lt;a&gt;" dispEnd="&lt;/a&gt;">bar</pc></source>
        <target>FOO<pc id="0" equivStart="START_LINK" equivEnd="CLOSE_LINK" type="link" dispStart="&lt;a&gt;" dispEnd="&lt;/a&gt;">BAR</pc></target>
      </segment>
    </unit>
    <unit id="5339604010413301604">
      <segment>
        <source><ph id="0" equiv="MAP NAME" disp="{{ &apos;test&apos; //i18n(ph=&quot;map name&quot;) }}"/></source>
        <target><ph id="0" equiv="MAP NAME" disp="{{ &apos;test&apos; //i18n(ph=&quot;map name&quot;) }}"/></target>
      </segment>
    </unit>`;

const XLIFF2_EXTRACTED = `
    <unit id="615790887472569365">
      <notes>
        <note category="location">file.ts:3</note>
      </notes>
      <segment>
        <source>i18n attribute on tags</source>
      </segment>
    </unit>
    <unit id="3707494640264351337">
      <notes>
        <note category="location">file.ts:5</note>
      </notes>
      <segment>
        <source>nested</source>
      </segment>
    </unit>
    <unit id="5539162898278769904">
      <notes>
        <note category="meaning">different meaning</note>
        <note category="location">file.ts:7</note>
      </notes>
      <segment>
        <source>nested</source>
      </segment>
    </unit>
    <unit id="3780349238193953556">
      <notes>
        <note category="location">file.ts:9</note>
        <note category="location">file.ts:10</note>
      </notes>
      <segment>
        <source><pc id="0" equivStart="START_ITALIC_TEXT" equivEnd="CLOSE_ITALIC_TEXT" type="fmt" dispStart="&lt;i&gt;" dispEnd="&lt;/i&gt;">with placeholders</pc></source>
      </segment>
    </unit>
    <unit id="5525133077318024839">
      <notes>
        <note category="location">file.ts:13</note>
      </notes>
      <segment>
        <source>on not translatable node</source>
      </segment>
    </unit>
    <unit id="8670732454866344690">
      <notes>
        <note category="location">file.ts:14</note>
      </notes>
      <segment>
        <source>on translatable node</source>
      </segment>
    </unit>
    <unit id="4593805537723189714">
      <notes>
        <note category="location">file.ts:19</note>
        <note category="location">file.ts:36</note>
      </notes>
      <segment>
        <source>{VAR_PLURAL, plural, =0 {zero} =1 {one} =2 {two} other {<pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">many</pc>} }</source>
      </segment>
    </unit>
    <unit id="4360321700965841752">
      <notes>
        <note category="location">file.ts:21,23</note>
      </notes>
      <segment>
        <source>
        <ph id="0" equiv="ICU" disp="{sex, select, 0 {...} m {...} f {...}}"/>
    </source>
      </segment>
    </unit>
    <unit id="5460933846928880074">
      <notes>
        <note category="location">file.ts:22</note>
      </notes>
      <segment>
        <source>{VAR_SELECT, select, 0 {other} m {male} f {female} }</source>
      </segment>
    </unit>
    <unit id="1746565782635215">
      <notes>
        <note category="location">file.ts:24,26</note>
      </notes>
      <segment>
        <source>
        <ph id="0" equiv="ICU" disp="{sexB, select, m {...} f {...}}"/>
    </source>
      </segment>
    </unit>
    <unit id="5868084092545682515">
      <notes>
        <note category="location">file.ts:25</note>
      </notes>
      <segment>
        <source>{VAR_SELECT, select, m {male} f {female} }</source>
      </segment>
    </unit>
    <unit id="4851788426695310455">
      <notes>
        <note category="location">file.ts:28</note>
      </notes>
      <segment>
        <source><ph id="0" equiv="INTERPOLATION" disp="{{ &quot;count = &quot; + count }}"/></source>
      </segment>
    </unit>
    <unit id="9013357158046221374">
      <notes>
        <note category="location">file.ts:29</note>
      </notes>
      <segment>
        <source>sex = <ph id="0" equiv="INTERPOLATION" disp="{{ sex }}"/></source>
      </segment>
    </unit>
    <unit id="8324617391167353662">
      <notes>
        <note category="location">file.ts:30</note>
      </notes>
      <segment>
        <source><ph id="0" equiv="CUSTOM_NAME" disp="{{ &quot;custom name&quot; //i18n(ph=&quot;CUSTOM_NAME&quot;) }}"/></source>
      </segment>
    </unit>
    <unit id="7685649297917455806">
      <notes>
        <note category="location">file.ts:35</note>
        <note category="location">file.ts:53</note>
      </notes>
      <segment>
        <source>in a translatable section</source>
      </segment>
    </unit>
    <unit id="2387287228265107305">
      <notes>
        <note category="location">file.ts:33,37</note>
      </notes>
      <segment>
        <source>
    <pc id="0" equivStart="START_HEADING_LEVEL1" equivEnd="CLOSE_HEADING_LEVEL1" type="other" dispStart="&lt;h1&gt;" dispEnd="&lt;/h1&gt;">Markers in html comments</pc>   
    <pc id="1" equivStart="START_TAG_DIV" equivEnd="CLOSE_TAG_DIV" type="other" dispStart="&lt;div&gt;" dispEnd="&lt;/div&gt;"></pc>
    <pc id="2" equivStart="START_TAG_DIV_1" equivEnd="CLOSE_TAG_DIV" type="other" dispStart="&lt;div&gt;" dispEnd="&lt;/div&gt;"><ph id="3" equiv="ICU" disp="{count, plural, =0 {...} =1 {...} =2 {...} other {...}}"/></pc>
</source>
      </segment>
    </unit>
    <unit id="1491627405349178954">
      <notes>
        <note category="location">file.ts:39</note>
      </notes>
      <segment>
        <source>it <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">should</pc> work</source>
      </segment>
    </unit>
    <unit id="i18n16">
      <notes>
        <note category="location">file.ts:41</note>
      </notes>
      <segment>
        <source>with an explicit ID</source>
      </segment>
    </unit>
    <unit id="i18n17">
      <notes>
        <note category="location">file.ts:42</note>
      </notes>
      <segment>
        <source>{VAR_PLURAL, plural, =0 {zero} =1 {one} =2 {two} other {<pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">many</pc>} }</source>
      </segment>
    </unit>
    <unit id="4085484936881858615">
      <notes>
        <note category="description">desc</note>
        <note category="location">file.ts:45,51</note>
      </notes>
      <segment>
        <source>{VAR_PLURAL, plural, =0 {Found no results} =1 {Found one result} other {Found <ph id="0" equiv="INTERPOLATION" disp="{{response.getItemsList().length}}"/> results} }</source>
      </segment>
    </unit>
    <unit id="4035252431381981115">
      <notes>
        <note category="location">file.ts:53</note>
      </notes>
      <segment>
        <source>foo<pc id="0" equivStart="START_LINK" equivEnd="CLOSE_LINK" type="link" dispStart="&lt;a&gt;" dispEnd="&lt;/a&gt;">bar</pc></source>
      </segment>
    </unit>
    <unit id="5339604010413301604">
      <notes>
        <note category="location">file.ts:55</note>
      </notes>
      <segment>
        <source><ph id="0" equiv="MAP NAME" disp="{{ &apos;test&apos; //i18n(ph=&quot;map name&quot;) }}"/></source>
      </segment>
    </unit>`;
