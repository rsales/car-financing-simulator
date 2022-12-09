<script setup>
</script>
<template>
  <div class="container mx-auto px-4">
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Valor do Carro:
        </label>
        <input class="money-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="carPrice">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Valor de entrada:
        </label>
        <input class="money-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="entryValue">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Valor a financiar:
        </label>
        <input class="money-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="amountToBeFinanced" readonly>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Quantidade de parcelas:
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" v-model="installments">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Taxa de juros efetiva:
        </label>
        <input class="percentage-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="tax">
      </div>
      <!-- <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div> -->
    </form>

    <br>
    <div id="adsgoeshere" style="background: #1d1f29; padding-top:60px; text-align: center;" v-html="adsenseContent"></div>
    <br>

    <div class="result">
      <h2>Resultado:</h2>
      <p>
        Simulação do financiamento do veículo com taxa de juros do formulário acima:
        <br><br>
        <strong>Simulando com taxa de juros de {{ tax }}:</strong> Valor do veículo de {{ carPrice }} ; entrada no valor de {{ entryValue }} ; financiando {{ amountToBeFinanced }} e pagando em {{ installments }} parcelas:
      </p>
      <ul>
        <li>O valor da parcela mensal será de {{ monthlyInstallmentAmount }} ;</li>
        <li>O total será de ({{ installments }} X {{ monthlyInstallmentAmount }}) = {{ totaly }} ;</li>
        <!-- <li>Os juros gerados será de (valor total menos valor financiado): ( R$ 64.571,40 - R$ 48.000,00) = R$ 16.571,40 ;</li>
        <li>IPVA anual aproximado = ( R$ 48.000,00 X 4% ) = R$ 1.920,00</li> -->
      </ul>
    </div>
  </div>
</template>

<!-- <script setup>
import { ref } from 'vue'

let carPrice = ref('R$ 79.990,00');
let entryValue = ref('R$ 20.00000');
let installments = ref(36);
let tax = ref('1,70 %');
let adsenseContent = ref('');
</script> -->

<script>
import VMasker from 'vanilla-masker';

export default {
  data() {
    return {
      carPrice: 'R$ 79.990,00',
      entryValue: 'R$ 20.000,00',
      installments: 36,
      tax: '1,70 %',
      adsenseContent: '',
    }
  },
  computed: { 
    amountToBeFinanced() {
      let calc = VMasker.toNumber(this.carPrice) - VMasker.toNumber(this.entryValue)
      return VMasker.toMoney(calc, {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$',
        zeroCents: false
      })
    },
    monthlyInstallmentAmount() {
      let amountToBeFinanced = VMasker.toNumber(this.carPrice) - VMasker.toNumber(this.entryValue)
      let i = Number(VMasker.toNumber(this.tax)) / 100

      let calOne = ((1 + (i / 100)) ** this.installments) * (i / 100)
      let calTwo = ((1 + (i / 100)) ** this.installments) - 1
      let result = (amountToBeFinanced * calOne) / calTwo;

      return VMasker.toMoney(Math.floor(result), {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$',
        zeroCents: false
      })
    },
    totaly() {
      let calc = this.installments * VMasker.toNumber(this.monthlyInstallmentAmount)
      return VMasker.toMoney(calc, {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$',
        zeroCents: false
      })
    }
  },
  methods: {
    moneyFormatter(value) {
      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      return formatter.format(value)
    },
    parcelas () {
      let amountToBeFinanced = VMasker.toNumber(this.carPrice) - VMasker.toNumber(this.entryValue)
      let i = Number(VMasker.toNumber(this.tax)) / 100

      let calOne = ((1 + (i / 100)) ** this.installments) * (i / 100)
      let calTwo = ((1 + (i / 100)) ** this.installments) - 1
      let result = (amountToBeFinanced * calOne) / calTwo;

      console.log(Math.floor(result))
      console.log(
        VMasker.toMoney(Math.floor(result), {
          precision: 1,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
          zeroCents: false
        }))
    }
  },
  mounted() {
    // this.adsenseContent = document.getElementById('divadsensedisplaynone').innerHTML

    VMasker(document.querySelectorAll(".money-input")).maskMoney({
      precision: 2,
      separator: ',',
      delimiter: '.',
      unit: 'R$',
      zeroCents: false
    });

    VMasker(document.querySelector(".percentage-input")).maskMoney({
      precision: 2,
      separator: ',',
      delimiter: '.',
      suffixUnit: '%',
      zeroCents: false
    });
  }
}
</script>