/**
 * * Encaminhando props com a sintaxe de espalhamento JSX
 *
 * Às vezes, passar props se torna muito repetitivo:
 */

/*export function Profile({ person, size, isSepia, thickBorder }) {
    return (
        <div className="card">
        <Avatar
            person={person}
            size={size}
            isSepia={isSepia}
            thickBorder={thickBorder}
        />
        </div>
    );
}*/

/**
 * Não há nada de errado com código repetitivo-ele pode ser mais legível. Mas às vezes você pode valorizar concisão. Alguns componentes encaminham todas as suas props aos seus filhos, como Profile faz com Avatar. Como eles não usam nenhuma de suas props diretamente, pode fazer sentido usar uma sintaxe de espalhamento mais concisa:
 */

/*function Profile2(props) {
    return (
      <div className="card">
        <Avatar {...props} />
      </div>
    );
}*/

/**
 * Isso encaminha todas as props de Profile ao Avatar sem listar cada um de seus nomes.
 *
 * Use a sintaxe de espalhamento com cuidado. Se você está a utilizando em quase todos os componentes, algo está errado. Muitas vezes, isso indica que você deveria dividir seus componentes e passar filhos como JSX. Mais sobre isso a seguir!
 */
