sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    '../model/formatter',
  ],
  function (BaseController, JSONModel, MessageBox, MessageToast,formatter) {
    "use strict";
    
    return BaseController.extend("com.incture.project1.controller.third", {
      formatter:formatter,
      onInit: async function () {
        this.oi18n=this.getView().getModel("i18n").getResourceBundle();
        // this.oi18n.getResourceBundle().getText("")
        try {
          var userInput = JSON.parse(localStorage.getItem("userInput"));
          this.getView().byId("lookup").setSelectedKey(userInput.lookup);
          this.getView().byId("receivers").setSelectedKey(userInput.receivers);
          this.getView().byId("messagemapping").setSelectedKey(userInput.messagemapping);
          this.getView().byId("externalizedparameters").setSelectedKey(userInput.externalizedparameters);
          this.getView().byId("dataPersistence").setSelectedKey(userInput.dataPersistence);
          this.getView().byId("groovy").setSelectedKey(userInput.groovy);
          this.getView().byId("dataValidation").setSelectedKey(userInput.dataValidation);
          this.getView().byId("errorhandling").setSelectedKey(userInput.errorhandling);
          this.getView().byId("functionalcomplexity").setSelectedKey(userInput.functionalcomplexity);
          this.getView().byId("routing").setSelectedKey(userInput.routing);
          this.getView().byId("multicast").setSelectedKey(userInput.multicast);
          if (userInput) {
            console.log(userInput)
            
            var inputModel = new JSONModel(userInput);
            this.getView().setModel(inputModel, "input");
          } else {
            // Initialize an empty model if no user input is found in localStorage
            // Initialize an empty model if no user input is found (unchanged)
            var emptyInputModel = new JSONModel({});
            this.getView().setModel(emptyInputModel, "input");
          }
        } catch (error) {
          console.error(error);
        }
      },
      onhelpdesk:function(){
        this.getOwnerComponent().getRouter().navTo("ranpakroot");
      },
      onFormDisplay:function(){
        this.getOwnerComponent().getRouter().navTo("FormPage");
      },
      onReset: function() {
        localStorage.removeItem("userInput"); 
        window.location.reload();
    },
      onSubmit: async function () {
        try {
          // Retrieve selected lookup value
          var lookup = this.getView().byId("lookup").getSelectedKey();
          var receivers = this.getView().byId("receivers").getSelectedKey();
          var messagemapping = this.getView().byId("messagemapping").getSelectedKey();
          var externalizedparameters = this.getView().byId("externalizedparameters").getSelectedKey();
          var dataPersistence = this.getView().byId("dataPersistence").getSelectedKey();
          var groovy = this.getView().byId("groovy").getSelectedKey();
          var dataValidation = this.getView().byId("dataValidation").getSelectedKey();
          var errorhandling = this.getView().byId("errorhandling").getSelectedKey();
          var functionalcomplexity = this.getView().byId("functionalcomplexity").getSelectedKey();
          var routing = this.getView().byId("routing").getSelectedKey();
          var multicast = this.getView().byId("multicast").getSelectedKey();

          if (lookup==="" || receivers==="" || messagemapping==="" || externalizedparameters==="" || dataPersistence==="" ||
            groovy==="" || dataValidation==="" || errorhandling==="" || functionalcomplexity==="" || routing==="" || multicast==="") {
            {
              this.getView().byId("lookup").setValueState("Error");
              this.getView().byId("lookup").setValueStateText("It's a mandatory field");
              this.getView().byId("receivers").setValueState("Error");
              this.getView().byId("receivers").setValueStateText("It's a mandatory field");

              this.getView().byId("messagemapping").setValueState("Error");
              this.getView().byId("messagemapping").setValueStateText("It's a mandatory field");

              this.getView().byId("externalizedparameters").setValueState("Error");
              this.getView().byId("externalizedparameters").setValueStateText("It's a mandatory field");

              this.getView().byId("dataPersistence").setValueState("Error");
              this.getView().byId("dataPersistence").setValueStateText("It's a mandatory field");

              this.getView().byId("groovy").setValueState("Error");
              this.getView().byId("groovy").setValueStateText("It's a mandatory field");

              this.getView().byId("dataValidation").setValueState("Error");
              this.getView().byId("dataValidation").setValueStateText("It's a mandatory field");

              this.getView().byId("errorhandling").setValueState("Error");
              this.getView().byId("errorhandling").setValueStateText("It's a mandatory field");
              this.getView().byId("functionalcomplexity").setValueState("Error");
              this.getView().byId("functionalcomplexity").setValueStateText("It's a mandatory field");
              this.getView().byId("routing").setValueState("Error");
              this.getView().byId("routing").setValueStateText("It's a mandatory field");
              this.getView().byId("multicast").setValueState("Error");
              this.getView().byId("multicast").setValueStateText("It's a mandatory field");
            }
        }

          // Construct request payload
          const requestData = {
            "lookup": lookup,
            "receivers": receivers,
            "messagemapping": messagemapping,
            "externalizedparameters": externalizedparameters,
            "dataPersistence": dataPersistence,
            "groovy": groovy,
            "dataValidation": dataValidation,
            "errorhandling": errorhandling,
            "functionalcomplexity": functionalcomplexity,
            "routing": routing,
            "multicast": multicast
          };

          // Store user input in localStorage
          localStorage.setItem("userInput", JSON.stringify(requestData));

          const url = 'https://saphire.cfapps.us10-001.hana.ondemand.com/saphire/lookup';

          const options = {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
              'Content-Type': 'application/json'
            }
          };

          // Make POST request
          const response = await fetch(url, options);
          const result = await response.json();
          console.log(requestData, " backend= ", result)
          if (result) {
            console.log(requestData);
            if(result<100){
              MessageBox.success(JSON.stringify("Low"));
            }e
            MessageBox.success(JSON.stringify(result));
          } else  {
            MessageBox.information("Please filled all the mandatory fields.");
          }
        } catch (error) {
          console.error(error);
          MessageBox.error("An error occurred while processing the request.");
        }
      }
      ,
      onSelLookUpCB: function (oEvent) {

        var selectedItem = oEvent.getParameter("selectedItem");
        // localJsonModel=this.getOwnerComponent().getModel("localJsonModel");
        // localJsonModel.getSelectedKey();
        var key = selectedItem.getKey(); // Get the key associated with the selected item

        console.log("Selected key:", key);
        // Perform further operations with the key value as needed

      }
    });
  }
);
