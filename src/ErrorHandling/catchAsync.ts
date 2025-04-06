export const catchAsync = (fn: Function) => (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
}