const { createApp } = Vue

createApp({
  data() {
    return {
      carPrice: 'R$ 80.000,00',
      entryValue: 'R$ 30.000,00',
      installments: 48,
      tax: '1,70 %',
      taxNum: 2.90,
      adsenseContent: '',
    }
  },
  computed: { 
    amountToBeFinanced: function () {
      let calc = VMasker.toNumber(this.carPrice) - VMasker.toNumber(this.entryValue)
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
      let calOne = ((1 + (this.taxNum / 100)) ** this.installments) * (this.taxNum / 100)
      let calTwo = ((1 + (this.taxNum / 100)) ** this.installments) - 1
      let result = (amountToBeFinanced * calOne) / calTwo;

      console.log(Math.floor(result))

      console.log(
        VMasker.toMoney(Math.floor(result), {
          precision: 2,
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
      suffixUnit: '%',
    });

    this.parcelas()

  // let percent = VMasker.toMoney(170, {
  //   precision: 2,
  //   separator: ',',
  //   suffixUnit: '%',
  // })

  //   let formatter = new Intl.NumberFormat("pt-BR", {style: 'percent'})

  //   console.log(percent)
  //   console.log(formatter.format(VMasker.toNumber(1.70)))
  }
}).mount('#app')