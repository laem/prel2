import Value, { Condition, ValueProps } from 'Components/EngineValue'
import RuleLink from 'Components/RuleLink'
import { DottedName } from 'modele-social'
import { isNotApplicable, isNotYetDefined } from 'publicodes'
import { Trans } from 'react-i18next'
import { useEngine } from './utils/EngineContext'

export const SalaireBrutSection = () => {
	return (
		<div className="payslip__salarySection">
			<h4 className="payslip__salaryTitle">
				<Trans>Salaire</Trans>
			</h4>
			<Line rule="contrat salarié . rémunération . brut de base" />
			<Line rule="contrat salarié . rémunération . avantages en nature . montant" />
			<Line rule="contrat salarié . activité partielle . retrait absence" />
			<Line rule="contrat salarié . activité partielle . indemnités" />
			<Line rule="contrat salarié . rémunération . heures supplémentaires" />
			<Line rule="contrat salarié . rémunération . heures complémentaires" />
			<Line rule="contrat salarié . rémunération . primes" />
			<Line rule="contrat salarié . frais professionnels" />
			<Line rule="contrat salarié . CDD . indemnités salarié" />
			<Condition expression="contrat salarié . rémunération . brut de base != contrat salarié . rémunération . brut">
				<Line rule="contrat salarié . rémunération . brut" />
			</Condition>
		</div>
	)
}

export const SalaireNetSection = () => {
	return (
		<div className="payslip__salarySection">
			<h4 className="payslip__salaryTitle">
				<Trans>Salaire net</Trans>
			</h4>
			<Line rule="contrat salarié . rémunération . net imposable" />
			<Condition
				expression={{
					['toutes ces conditions']: [
						'contrat salarié . rémunération . avantages en nature', // bool
						'contrat salarié . frais professionnels . titres-restaurant', // bool
					],
				}}
			>
				<Line rule="contrat salarié . rémunération . net de cotisations" />
			</Condition>
			<Line
				negative
				rule="contrat salarié . rémunération . avantages en nature . montant"
			/>
			<Line
				negative
				rule="contrat salarié . frais professionnels . titres-restaurant . montant"
			/>
			<Line
				rule="contrat salarié . rémunération . net"
				className="payslip__total"
			/>
			<Condition expression="impôt > 0">
				<Line negative rule="impôt" unit="€/mois" />
				<Line
					className="payslip__total"
					rule="contrat salarié . rémunération . net après impôt"
				/>
			</Condition>
		</div>
	)
}

type LineProps = {
	rule: DottedName
	negative?: boolean
} & Omit<ValueProps<DottedName>, 'expression'>

export function Line({
	rule,
	displayedUnit = '€',
	negative = false,
	className,
	...props
}: LineProps) {
	const engine = useEngine()

	const evaluatedNode = engine.evaluate(rule)
	if (
		isNotYetDefined(evaluatedNode.nodeValue) ||
		// ⚠️ isNotApplicable is a bad func only here to help with further refactoring:
		isNotApplicable(evaluatedNode.nodeValue) ||
		evaluatedNode.nodeValue === 0
	)
		return null

	return (
		<Condition expression={`${rule} > 0`}>
			<RuleLink dottedName={rule} className={className} />
			<Value
				linkToRule={false}
				expression={(negative ? '- ' : '') + rule}
				unit={displayedUnit === '€' ? '€/mois' : displayedUnit}
				displayedUnit={displayedUnit}
				className={className}
				{...props}
			/>
		</Condition>
	)
}
