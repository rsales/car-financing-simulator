<template>
	<BannerInfo v-show="false" />
	<TheHeader />
	<div class="container mx-auto px-40">
    
		<form id="form" class="pt-6">
      <h2 class="text-3xl mb-10 font-black">Minha Simulação:</h2>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="carPrice">
					Valor do Carro:
				</label>
				<input class="money-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:ring-indigo-500" id="carPrice" type="text" v-model="carPrice" @keyup="showResult = false">
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="entryValue">
					Valor de entrada:
				</label>
				<input class="money-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:ring-indigo-500" id="entryValue" type="text" v-model="entryValue" @keyup="showResult = false">
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="amountToBeFinanced">
					Valor a financiar:
				</label>
				<input class="money-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200 focus:outline-none focus:shadow-outline cursor-not-allowed" id="amountToBeFinanced" type="text" v-model="amountToBeFinanced" @keyup="showResult = false" readonly>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="installments">
					Quantidade de parcelas:
				</label>
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:ring-indigo-500" id="installments" type="number" v-model="installments" @keyup="showResult = false">
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="tax">
					Taxa de juros efetiva:
				</label>
				<input class="percentage-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:ring-indigo-500" id="tax" type="text" v-model="tax" @keyup="showResult = false">
			</div>
			<div class="flex items-center justify-between">
				<button 
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:border-indigo-500 focus:ring-indigo-500"
					type="button"
					@click="sendSimulation()"
					:disabled="disabledButton"
				>
					Fazer Simulação 👍
				</button>
			</div>
		</form>

		<Transition name="fade">
			<div v-if="showResult" id="result" class="mt-7 pt-10">
				<div class="overflow-hidden bg-white shadow sm:rounded-lg">
					<div class="px-4 py-5 sm:px-6">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Resultado</h3>
						<p class="mt-1 max-w-2xl text-sm text-gray-500">
							Simulação do financiamento do veículo com taxa de juros do formulário acima
						</p>
					</div>
					<div class="border-t border-gray-200">
						<dl>
							<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">Simulando com a taxa de juros de...</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ tax }}</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">Valor do veículo de...</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ carPrice }}</dd>
							</div>
							<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">entrada no valor de...</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ entryValue }}</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">financiando...</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"><strong>{{ amountToBeFinanced }}</strong></dd>
							</div>
							<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">pagando em...</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ installments }} parcelas</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">O valor da parcela mensal será de</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"><strong>{{ monthlyInstallmentAmount }}</strong></dd>
							</div>
							<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">O total será de ({{ installments }} X {{ monthlyInstallmentAmount }})</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ totaly }}</dd>
							</div>
							<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">Os juros gerados será de (<strong>total</strong> - <strong>financiado</strong>)</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">({{ totaly }} - {{ amountToBeFinanced }}) = <strong>{{ interestGenerated }}</strong></dd>
							</div>
							<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">IPVA anual aproximado</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">({{ carPrice }} X 4%) = {{ ipvaCalc }}</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</Transition>
		<a
			id="downloadCSV"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:border-indigo-500 focus:ring-indigo-500 mt-7"
			type="button"
			v-show="showResult"
		>
			⬇ Baixar planilha de parcelas
		</a>
	</div>
	<TheFooter />
</template>

<script>
import VMasker from 'vanilla-masker';
import BannerInfo from '../components/BannerInfo.vue'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

export default {
	data() {
		return {
			carPrice: 'R$ 79.990,00',
			entryValue: 'R$ 0,00',
			installments: 36,
			tax: '1,70 %',
			adsenseContent: '',
			showResult: false,
			installmentMonth: [],
		}
	},
	components: {
		BannerInfo,
		TheHeader,
		TheFooter
	},
	computed: { 
		amountToBeFinanced() {
			let calc = VMasker.toNumber(this.carPrice) - VMasker.toNumber(this.entryValue);
			return this.convertMoney(calc);
		},
		monthlyInstallmentAmount() {
			let amountToBeFinanced = VMasker.toNumber(this.carPrice) - VMasker.toNumber(this.entryValue);
			let i = Number(VMasker.toNumber(this.tax)) / 100;

			let calOne = ((1 + (i / 100)) ** this.installments) * (i / 100);
			let calTwo = ((1 + (i / 100)) ** this.installments) - 1;
			let result = (amountToBeFinanced * calOne) / calTwo;

			return this.convertMoney(Math.floor(result));
		},
		totaly() {
			let calc = this.installments * VMasker.toNumber(this.monthlyInstallmentAmount)
			return this.convertMoney(calc);
		},
		interestGenerated() {
			let calc = VMasker.toNumber(this.totaly) - VMasker.toNumber(this.amountToBeFinanced)
			return this.convertMoney(calc);
		},
		ipvaCalc() {
			let calc = VMasker.toNumber(this.carPrice) *  (4 / 100)
			return this.convertMoney(calc);
		},
		disabledButton() {
			return this.showResult || !this.carPrice || !this.installments || !this.tax;
		}
	},
  watch: {
    showResult(value) {
      if(!value) {
        this.installmentMonth = []
      }
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
		scrollResult() {
			this.$router.push('/#result')
			document.getElementById('result').scrollIntoView({
				behavior: "smooth"
			})
		},
		convertMoney(value) {
			return VMasker.toMoney(value, {
				precision: 2,
				separator: ',',
				delimiter: '.',
				unit: 'R$',
				zeroCents: false
			});
		},
		sendSimulation() {
			this.showResult = !this.showResult;
			setTimeout(this.scrollResult, 200);

			this.installmentMonthByMonth();
		},
		installmentMonthByMonth() {
			let interaction = 1;
			let lastSaldoDevedor = VMasker.toNumber(this.amountToBeFinanced);
			let lastInterest = VMasker.toNumber(this.amountToBeFinanced) * ((VMasker.toNumber(this.tax) / 100) / 100);
			let lastAmortizado = VMasker.toNumber(this.monthlyInstallmentAmount) - lastInterest;

			for (interaction; interaction <= this.installments; interaction++) {
				lastInterest =  Math.floor(lastSaldoDevedor * ((VMasker.toNumber(this.tax) / 100) / 100));
				lastAmortizado = VMasker.toNumber(this.monthlyInstallmentAmount) - lastInterest;
				lastSaldoDevedor = lastSaldoDevedor - lastAmortizado;

				this.installmentMonth.push({
					n_prestacao: interaction,
					prestacao: this.monthlyInstallmentAmount,
					juros: this.convertMoney(lastInterest),
					amortizado: this.convertMoney(lastAmortizado),
					saldo_devedor: this.convertMoney(lastSaldoDevedor)
				})
			}

			const titleKeys = Object.keys(this.installmentMonth[0])
			const refinedData = []
			
			refinedData.push(titleKeys)
			this.installmentMonth.forEach(item => {
				refinedData.push(Object.values(item))  
			})

			let csvContent = ''
			refinedData.forEach(row => {
				csvContent += '"' + row.join('","') + '"' + '\n'
			})

			const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
			const objUrl = URL.createObjectURL(blob)

			const link = document.querySelector('#downloadCSV');
			link.setAttribute('href', objUrl)
			link.setAttribute('download', 'planilha-de-parcelas.csv')

		}
	},
	mounted() {
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

		// this.installmentMonthByMonth();
	}
}
</script>

<style lang="postcss">
button:disabled {
	@apply bg-slate-300;
	@apply hover:bg-slate-300;
	@apply text-slate-100;
	@apply cursor-not-allowed;	
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>