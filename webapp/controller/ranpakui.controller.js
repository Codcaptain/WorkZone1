sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("com.incture.project1.controller.ranpakui", {
      onTextChange: function () {
          var oView = this.getView();
          var sSubject = oView.byId("subjectTextArea").getValue();
          var sDescription = oView.byId("descriptionTextArea").getValue();

          // Validate the Description field: allow only letters and spaces
          var sValidDescription = sDescription.replace(/[^a-zA-Z\s]/g, "");
          if (sDescription !== sValidDescription) {
              // Update the value to only valid characters
              oView.byId("descriptionTextArea").setValue(sValidDescription);

              // Optionally, show a message to the user
              sap.m.MessageToast.show("Please enter only letters in the description.");
          }

          var bEnableSubmit = sSubject.length > 0 && sDescription.length > 0;
          oView.byId("submitButton").setEnabled(bEnableSubmit);
      },

      onsubmit: function () {
          sap.m.MessageToast.show("Form submitted successfully!");
      }
  });
});