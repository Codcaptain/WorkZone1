sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
    ],
    function(Controller,Fragment) {
      "use strict";
  
      return Controller.extend("com.incture.project1.controller.FormUi", {
        onInit: function() {
          var ODataService=this.getOwnerComponent().getModel("ODataService");
          var localJsonModel=this.getOwnerComponent().getModel("localJsonModel");
          var oTable=this.byId("idProductsTable");
          oTable.setBusy(true);
          ODataService.read("/Products",{
            success:function(oData){
              console.log(oData.results);
              localJsonModel.setProperty("/products",oData.results)
              oTable.setBusy(false);
            },
            error:function(err){
              console.log(err)
            }
          })
        },
        handleSelectionChange: function(oEvent){
          var sPath=oEvent.getParameter("listItem").getBindingContextPath();
          var localJsonModel=this.getOwnerComponent().getModel("localJsonModel");
          var oGetDetails=oEvent.getParameter("listItem").getBindingContext("localJsonModel").getObject();
          localJsonModel.setProperty("/oGetDetails",oGetDetails)
          console.log(oGetDetails);
          if(!this.oDetailsDisplay){
            this.oDetailsDisplay=Fragment.load({
              id: this.getView().byId(),
              name: "com.incture.project1.fragments.DetailPopup",
              controller: this
            }).then(function (oDialog){
              this._oDialog=oDialog;
              this.getView().addDependent(this._oDialog);
              this._oDialog.open();
            }.bind(this))
          }else{
            this._oDialog.open();
          }
        },
        onClosedialog: function(){
          this._oDialog.close();
        },
        onSubmitLastCol:function(oEvent){
          var oValue=oEvent.getSource().oParent.mAggregations.items[1].mProperties.value;
          var localJsonModel=this.getOwnerComponent().getModel("localJsonModel");
          var oInputLastName=localJsonModel.getProperty("/InputValue");
          let arr=localJsonModel.getProperty("/products")
          arr.map(items=>items.Lastname=oInputLastName);
          if(oValue){
            let finalResult=localJsonModel.getProperty("/products");
            localJsonModel.setProperty("/Newproducts",finalResult)
          }
        }
      });
    }
  );
  