export const delay = (milis: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, milis));
}