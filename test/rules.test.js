import { map } from 'ramda'
import { expect } from 'chai'
import {
	rules,
	enrichRule,
	translateAll,
	findVariantsAndRecords
} from '../source/engine/rules'

let stateSelector = (state, name) => null

describe('enrichRule', function() {
	it('should extract the type of the rule', function() {
		let rule = { nom: 'retraite', cotisation: {} }
		expect(enrichRule(rule)).to.have.property('type', 'cotisation')
	})

	it('should load external data into the rule', function() {
		let data = { taux_versement_transport: { one: 'two' } }
		let rule = {
			nom: 'retraite',
			cotisation: {},
			données: 'taux_versement_transport'
		}
		expect(enrichRule(rule, data)).to.have.deep.property('data', { one: 'two' })
	})

	it('should extract the dotted name of the rule', function() {
		let rule = { espace: 'contrat salarié', nom: 'CDD' }
		expect(enrichRule(rule)).to.have.property('name', 'CDD')
		expect(enrichRule(rule)).to.have.property(
			'dottedName',
			'contrat salarié . CDD'
		)
	})

	it('should render Markdown in sub-questions', function() {
		let rule = { nom: 'quoi', 'sous-question': '**wut**' }
		expect(enrichRule(rule)).to.have.property(
			'subquestion',
			'<p><strong>wut</strong></p>\n'
		)
	})
})

describe('rule checks', function() {
	it('most input rules should have defaults', function() {
		let rulesNeedingDefault = rules.filter(
			r =>
				r.espace &&
				!r.simulateur &&
				(!r.formule || r.formule['une possibilité']) &&
				r.defaultValue == null
		)

		rulesNeedingDefault.map(r =>
			console.log(
				'cette règle, ',
				r.dottedName,
				'devrait avoir une valeur par défaut'
			)
		)
		expect(rulesNeedingDefault).to.be.empty
	})
})

describe('translateAll', function() {
	it('should translate flat rules', function() {
		let rules = [{
			"espace":"foo",
			"nom":"bar",
			"titre":"Titre",
			"description":"Description",
			"question":"Question",
			"sous-question":"Sous Question",
		}]
		let translations = {
			"foo . bar":{
				"titre.en":"TITRE",
				"description.en":"DESC",
				"question.en":"QUEST",
				"sous-question.en":"SOUSQ",
			}
		}

		let result = translateAll(translations, map(enrichRule,rules))

		expect(result[0]).to.have.property("titre","TITRE")
		expect(result[0]).to.have.property("description","DESC")
		expect(result[0]).to.have.property("question","QUEST")
		expect(result[0]).to.have.property("sous-question","SOUSQ")
	})
})
