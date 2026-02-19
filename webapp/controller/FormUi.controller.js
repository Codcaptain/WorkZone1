sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
    ],
    function(Controller) {
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
        }
      });
    }
  );
  