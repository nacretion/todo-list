# Etagi TODO


# Описанные сущности:
- User


## User 
Описывает объект пользователя в приложении и содержит несколько методов для работы с базой данных и аутентификации.

> ### ```constructor(id: number, login: string, password: string, firstName: string, lastName: string, secondName: string)```
> 
>Конструктор создает новый экземпляр класса User с заданными параметрами.

> ### ```getAbbreviatedNameById(id: number): Promise<string | undefined>```
>
>Метод получает идентификатор пользователя и возвращает его сокращенное имя в формате "Фамилия И.О." если пользователь найден, иначе возвращает undefined.

> ### ```findById(id: number): Promise<User | undefined>```
>
>Метод получает идентификатор пользователя и возвращает экземпляр класса User если пользователь найден, иначе возвращает undefined.

> ### ```findByUsername(username: string): Promise<User | undefined>```
> 
>Метод получает имя пользователя и возвращает экземпляр класса User если пользователь найден, иначе возвращает undefined.

> ### ```create(login: string, password: string, firstName: string, lastName: string, secondName: string): Promise<User | undefined>```
>
>Метод создает нового пользователя в базе данных с заданными параметрами, если пользователь с таким именем уже существует, возвращает undefined.

> ### ```authenticateUser(username: string, password: string): Promise<{user: User, token: string} | number>```
>
>Метод аутентификации пользователя, принимает имя пользователя и пароль, проверяет соответствие с базой данных и возвращает экземпляр класса User и JWT токен, если пользователь аутентифицирован успешно, иначе возвращает HTTP статус ошибки.

> ### ```createToken(user: User): Promise<string | undefined>```
>
>Метод создает JWT токен для пользователя.

> ### ```verifyToken(token: string): Promise<boolean>```
>
>Метод проверяет действительность JWT токена, принимает токен и возвращает true, если токен действительный, иначе возвращает false.