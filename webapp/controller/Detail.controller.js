/* eslint-disable no-undef */

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/UIComponent',
  'sap/ui/core/routing/History',
  'sap/m/MessageToast'
], function (Controller, UIComponent, History, MessageToast) {
  'use strict'

  return Controller.extend('sap.ui.demo.walkthrough.controller.Detail', {
    onInit: function () {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this)
      oRouter.getRoute('detail').attachPatternMatched(this._onObjectMatched, this)
    },
    _onObjectMatched: function (oEvent) {
      this.byId('rating').reset()
      this.getView().bindElement({
        path: '/' + window.decodeURIComponent(oEvent.getParameter('arguments').invoicePath),
        model: 'invoice'
      })
    },
    onNavBack: function () {
      const oHistory = History.getInstance()
      const sPreviousHash = oHistory.getPreviousHash()

      if (sPreviousHash !== undefined) {
        window.history.go(-1)
      } else {
        const oRouter = UIComponent.getRouterFor(this)
        oRouter.navTo('overview', {}, true)
      }
    },
    onRatingChange: function (oEvent) {
      const fValue = oEvent.getParameter('value')
      const oResourceBundle = this.getView().getModel('i18n').getResourceBundle()

      MessageToast.show(oResourceBundle.getText('ratingConfirmation', [fValue]))
    }
  })
})
