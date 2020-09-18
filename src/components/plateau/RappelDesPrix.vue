<template functional>
  <div class="rappel-des-prix">
    <table class="ml-10 table usn">
      <tr class="caption font-weight-bold">
        <td class="w100" style="border-left: none;"></td>
        <td class="w60 border-top">Grd terr.</td>
        <td class="w60 border-top">Ptt terr.</td>
        <td class="w60 border-top">Atelier</td>
      </tr>
      <tr class="caption">
        <td class="font-weight-bold">Invest. €</td>
        <td>30000</td>
        <td>15000</td>
        <td>20000</td>
      </tr>
    </table>
    <div class="ml-10 mt-1 caption font-italic usn" style="width: 280px">A tout moment, c’est votre décision !</div>
    <table class="ml-10 mt-3 usn">
      <tr class="caption font-weight-bold production">
        <td class="border-top w100">Production €</td>
        <td class="border-top w60">M.P.</td>
        <td class="border-top w60">M.O.</td>
      </tr>
      <tr class="caption text-right production">
        <td>1 T</td>
        <td>1000</td>
        <td>1000</td>
      </tr>
      <tr class="caption text-right production">
        <td>1 Atelier = 3 T</td>
        <td>3000</td>
        <td>3000</td>
      </tr>
      <tr class="caption text-right production">
        <td>2 Ateliers = 6 T</td>
        <td>6000</td>
        <td>6000</td>
      </tr>
    </table>
    <div class="ml-10 mt-1 caption font-italic usn" style="width: 280px; line-height: 14px">Produisez systématiquement pour <b>tous</b> les ateliers en période de production</div>
    <table class="ml-10 mt-3 usn">
      <tr class="caption font-weight-bold ventes">
        <td class="w100 border-top">Ventes €</td>
        <td class="w60 border-top">P.V.</td>
      </tr>
      <tr class="caption text-right ventes">
        <td>1 T</td>
        <td>3000</td>
      </tr>
    </table>
    <div class="ml-10 mt-1 caption font-italic usn" style="width: 280px; line-height: 14px">Vendez ce que vous voulez
      en période de ventes</div>
  </div>
</template>

<style scoped>
  table {
    border-collapse: collapse;
    border: none;
    color: rgba(0,0,0,0.8);
  }

  table td + td {
    padding-left: 10px;
  }

  td {
    padding: 0 4px !important;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    border-right: 1px solid rgba(0, 0, 0, 0.3);
    border-left: 1px solid rgba(0, 0, 0, 0.3);
  }

  .w100 {
    width: 100px;
  }

  .w60 {
    width: 60px;
  }

  .border-top {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }

  .activite > tr, .periode {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .ventes {
    background-color: #FFEECE;
  }

  .production {
    background-color: #D1D4E8;
  }
</style>