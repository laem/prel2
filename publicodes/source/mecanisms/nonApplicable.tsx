import React from 'react'
import { evaluationFunction } from '..'
import { InfixMecanism, Mecanism } from '../components/mecanisms/common'
import { ASTNode, EvaluatedNode } from '../AST/types'
import { bonus, makeJsx, mergeMissing } from '../evaluation'
import { registerEvaluationFunction } from '../evaluationFunctions'
import parse from '../parse'
export type NonApplicableSiNode = {
	explanation: {
		condition: ASTNode
		valeur: ASTNode
	}
	jsx: any
	nodeKind: 'non applicable si'
}
function MecanismNonApplicable({ explanation }) {
	return (
		<InfixMecanism prefixed value={explanation.valeur}>
			<Mecanism
				name="non applicable si"
				value={explanation.condition.nodeValue}
			>
				{makeJsx(explanation.condition)}
			</Mecanism>
			<br />
		</InfixMecanism>
	)
}

const evaluate: evaluationFunction<'non applicable si'> = function(node) {
	const condition = this.evaluateNode(node.explanation.condition)
	let valeur = node.explanation.valeur
	if (condition.nodeValue === false || condition.nodeValue === null) {
		valeur = this.evaluateNode(valeur)
	}
	return {
		...node,
		nodeValue:
			condition.nodeValue === null
				? null
				: condition.nodeValue !== false
				? false
				: 'nodeValue' in valeur
				? (valeur as EvaluatedNode).nodeValue
				: null,
		explanation: { valeur, condition },
		missingVariables: mergeMissing(
			'missingVariables' in valeur ? valeur.missingVariables : {},
			bonus(condition.missingVariables)
		),
		...('unit' in valeur && { unit: valeur.unit })
	}
}

export default function parseNonApplicable(v, context) {
	const explanation = {
		valeur: parse(v.valeur, context),
		condition: parse(v[parseNonApplicable.nom], context)
	}
	return {
		jsx: MecanismNonApplicable,
		explanation,
		nodeKind: parseNonApplicable.nom
	} as NonApplicableSiNode
}

parseNonApplicable.nom = 'non applicable si' as const

registerEvaluationFunction(parseNonApplicable.nom, evaluate)
