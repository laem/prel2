import Warning from 'Components/ui/WarningBlock'
import { Trans } from 'react-i18next'
import { SitePaths } from './utils/SitePathsContext'

type SimulateurWarningProps = {
	simulateur: Exclude<keyof SitePaths['simulateurs'], 'index'>
}

export default function SimulateurWarning({
	simulateur,
}: SimulateurWarningProps) {
	return (
		<Warning
			localStorageKey={'app::simulateurs:warning-folded:v1:' + simulateur}
		>
			<ul>
				{simulateur == 'auto-entrepreneur' && (
					<>
						<li>
							<Trans i18nKey="simulateurs.warning.auto-entrepreneur">
								Les auto-entrepreneurs bénéficient d’un régime très simplifié
								avec un taux forfaitaire pour le calcul des cotisations et
								contributions sociales appliqué sur le chiffre d’affaires. Selon
								le choix de la modalité de paiement des impôts il est appliqué
								un abattement forfaitaire au titre des frais professionnels. Il
								n’est pas possible de déduire des charges réelles en plus. Votre
								revenu net est donc le chiffre d’affaires moins toutes les
								charges engagées pour l’entreprise.
							</Trans>
						</li>
						<li>
							<Trans i18nKey="simulateurs.warning.cfe">
								Le simulateur n'intègre pas la cotisation foncière des
								entreprise (CFE) qui est dûe dès la deuxième année d'exercice.
								Son montant varie fortement en fonction du chiffre d'affaires et
								de la domiciliation de l'entreprise.{' '}
								<a href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F23547">
									Plus d'infos.
								</a>
							</Trans>
						</li>
					</>
				)}
				{simulateur !== 'artiste-auteur' && (
					<li>
						<Trans i18nKey="simulateurs.warning.urssaf">
							Les calculs sont indicatifs. Ils ne se substituent pas aux
							décomptes réels de l’Urssaf, de l’administration fiscale ou de
							toute autre organisme.
						</Trans>
					</li>
				)}

				{simulateur == 'profession-libérale' && (
					<Trans i18nKey="simulateurs.warning.profession-libérale">
						<li>
							Ce simulateur est à destination des professions libérales en BNC.
							Il ne prend pas en compte les sociétés d'exercice libéral.
						</li>
					</Trans>
				)}
				{simulateur === 'sasu' && (
					<li>
						<Trans i18nKey="simulateurs.warning.sasu">
							L'impôt sur les sociétés et la gestion des dividendes ne sont pas
							encore implémentés.
						</Trans>
					</li>
				)}
				{simulateur === 'artiste-auteur' && (
					<>
						<li>
							<Trans i18nKey="simulateurs.warning.artiste-auteur.1">
								Cette estimation est proposée à titre indicatif. Elle est faite
								à partir des éléments réglementaires applicables et des éléments
								que vous avez saisis, mais elle ne tient pas compte de
								l'ensemble de votre situation. Le montant réel de vos
								cotisations peut donc être différent.
							</Trans>
						</li>
						<li>
							<Trans i18nKey="simulateurs.warning.artiste-auteur.2">
								Ce simulateur permet d'estimer le montant de vos cotisations à
								partir de votre revenu projeté
							</Trans>
						</li>
					</>
				)}
				{['indépendant', 'profession-libérale'].includes(simulateur) && (
					<li>
						<Trans i18nKey="simulateurs.warning.année-courante">
							Le montant calculé correspond aux cotisations de l’année 2021
							(pour un revenu 2021).
						</Trans>
					</li>
				)}
				{['profession-libérale'].includes(simulateur) && (
					<li>
						<Trans i18nKey="simulateurs.warning.cotisations-ordinales">
							Pour les professions réglementées, le simulateur ne calcule pas le
							montant des cotisations à l'ordre. Elles doivent être ajoutées
							manuellement dans la case « charges de fonctionnement ».
						</Trans>
					</li>
				)}
				{simulateur == 'équivalent-salaire-tjm' && (
					<>
						<li>
							<Trans i18nKey="simulateurs.warning.équivalent-salaire-tjm.1">
								Les calculs ne prennent pas en compte les vacances que vous
								pourriez prendre au cours de l'année.
							</Trans>
						</li>
						<li>
							<Trans i18nKey="simulateurs.warning.équivalent-salaire-tjm.2">
								Une base de 21 jours de travail par mois est utilisée pour le
								tarif journalier.
							</Trans>
						</li>
						<li>
							<Trans i18nKey="simulateurs.warning.équivalent-salaire-tjm.3">
								Aucuns frais professionnels n'ont été comptés, il faudra adapter
								votre tarif pour les prendre en compte
							</Trans>
						</li>
					</>
				)}
			</ul>
		</Warning>
	)
}
