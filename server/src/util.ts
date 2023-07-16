export const delay = async (milis: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, milis));
}