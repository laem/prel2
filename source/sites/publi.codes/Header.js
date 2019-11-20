import React from 'react'
import { Link } from 'react-router-dom'
export const Header = ({ noSubtitle }) => (
	<header css="text-align: center; a {text-decoration: none}">
		<Link to="/">
			<h1>
				<span css="border: 3px solid var(--colour); color: var(--colour); padding: 0.1rem 0.4rem 0.1rem 0.6rem ; width: 5rem">
					publi
				</span>
				<span css="background: var(--colour); color: white; padding: 0.1rem 0.6rem 0.1rem 0.3rem; width: 5rem; border: 3px solid var(--colour)">
					codes
				</span>
			</h1>
		</Link>
		{!noSubtitle && (
			<p css="width: 28rem; margin: 0 auto; font-size: 120%">
				Un nouveau langage de calcul pour encoder les algorithmes d'intérêt
				public.
			</p>
		)}
	</header>
)
