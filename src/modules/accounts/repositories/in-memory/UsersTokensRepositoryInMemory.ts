import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens: UserTokens[] = [];

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = this.usersTokens.find(
            (user_token) =>
                user_token.user_id === user_id &&
                user_token.refresh_token &&
                refresh_token
        );

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find(
            (user_token) => user_token.id === id
        );

        this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find(
            (user_token) => user_token.refresh_token === refresh_token
        );

        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
