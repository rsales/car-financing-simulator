const { createApp } = Vue

createApp({
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
    this.adsenseContent = document.getElementById('divadsensedisplaynone').innerHTML

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
}).mount('#app')