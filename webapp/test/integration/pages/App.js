/* eslint-disable no-undef */
sap.ui.define([
  'sap/ui/test/Opa5',
  'sap/ui/test/actions/Press'
], function (Opa5, Press) {
  'use strict'

  const sViewName = 'sap.ui.demo.walkthrough.view.HelloPanel'

  // Check Hello Button

  Opa5.createPageObjects({
    onTheAppPage: {
      actions: {
        iPressTheSayHelloWithDialogButton: function () {
          return this.waitFor({
            id: 'helloDialogButton',
            viewName: sViewName,
            actions: new Press(),
            errorMessage: "Did not find the 'Say Hello With Dialog' button on the HelloPanel view"
          })
        },
        iPressTheHelloButton: function () {
          return this.waitFor({
            id: 'helloButton',
            viewName: sViewName,
            actions: new Press(),
            errorMessage: "Did not find the 'Say Hello Button' button on the HelloPanel view"
          })
        }
      },

      assertions: {
        iShouldSeeTheHelloDialog: function () {
          return this.waitFor({
            controlType: 'sap.m.Dialog',
            success: function () {
              // we set the view busy, so we need to query the parent of the app
              Opa5.assert.ok(true, 'The dialog is open')
            },
            errorMessage: 'Did not find the dialog control'
          })
        },
        iShouldSeeTheHelloMsg: function () {
          return this.waitFor({
            pollingInterval: 100,
            viewName: sViewName,
            check: function () {
              // !! means casting the variable to be strictly boolean
              // When the element existis, the length === 1 which is considered to be false
              // If the element does not exist, the length === 0 which is considered to be false
              console.log('HA:' + sap.ui.test.Opa5.getJQuery()('.sapMMessageToast').length)
              return !!sap.ui.test.Opa5.getJQuery()('.sapMMessageToast').length
            },
            success: function () {
              // we set the view busy, so we need to query the parent of the app
              Opa5.assert.ok(true, 'Msg Toast is displayed')
            },
            errorMessage: 'Did not find the Msg Toast Control'
          })
        }
      }
    }
  })
})
