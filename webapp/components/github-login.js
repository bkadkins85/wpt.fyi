/**
 * Copyright 2019 The WPT Dashboard Project. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import '../node_modules/@polymer/paper-dialog/paper-dialog.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import { html } from '../node_modules/@polymer/polymer/polymer-element.js';
import { PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/paper-button/paper-button.js';
import '../node_modules/@polymer/paper-menu-button/paper-menu-button.js';
import '../node_modules/@polymer/iron-icon/iron-icon.js';
import '../node_modules/@polymer/paper-styles/color.js';
import '../node_modules/@polymer/paper-toggle-button/paper-toggle-button.js';
import { WPTFlags } from '../components/wpt-flags.js';

class GitHubLogin extends WPTFlags(PolymerElement) {
  static get template() {
    return html`
    <style>
      .log-in-button {
        text-transform: inherit;
      }
      .github-icon {
        margin-right: 8px;
        fill: white;
      }
      paper-icon-button {
        margin-left: 16px;
      }
      .help {
        vertical-align: baseline;
      }
      .triage-toggle {
        display: inline;
      }
    </style>
    <template is="dom-if" if="[[!user]]">
     <iron-icon class="help" src="/static/help.svg" onclick="[[openHelpDialog]]"></iron-icon>
      <paper-button class="log-in-button" raised onclick="[[logIn]]">
      <iron-icon class="github-icon" src="/static/github.svg"></iron-icon>
      Sign in with GitHub
      </paper-button>
    </template>
    <template is="dom-if" if="[[user]]">
      <div>
        <paper-toggle-button class="triage-toggle" checked="{{multiselectTriageUI}}">
          Triage Mode
         </paper-toggle-button>
        <iron-icon class="github-icon" src="/static/github.svg"></iron-icon>
          [[user]]
        <paper-icon-button title="Sign out" icon="exit-to-app" onclick="[[logOut]]"></paper-icon-button>
      </div>
    </template>
    <paper-dialog id="dialog">
      <h3>wpt.fyi Login</h3>
      <div>Logging in to wpt.fyi enables users to have a customized landing page, set default
      configurations, and triage tests from the wpt.fyi UI </div>
      <div>To annotate tests, click on Triage Mode below </div>
      <div class="buttons">
        <paper-button dialog-dismiss>Dismiss</paper-button>
      </div>
    </paper-dialog>
`;
  }

  static get is() {
    return 'github-login';
  }

  static get properties() {
    return {
      user: {
        type: String,
        value: null,
      },
    };
  }

  constructor() {
    super();
    this.logIn = this.handleLogIn.bind(this);
    this.logOut = this.handleLogOut.bind(this);
    this.openHelpDialog = this.openHelpDialog.bind(this);
  }

  handleLogIn() {
    const url = new URL('/login', window.location);
    url.searchParams.set('return', window.location);
    window.location = url;
  }

  handleLogOut() {
    const url = new URL('/logout', window.location);
    url.searchParams.set('return', window.location);
    window.location = url;
  }

  openHelpDialog() {
    const dialog = this.$.dialog;
    dialog.open();
  }

}
window.customElements.define(GitHubLogin.is, GitHubLogin);