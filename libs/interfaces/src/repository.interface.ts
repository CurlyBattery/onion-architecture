export interface IRepository<
  T,
  WhereInput,
  Select,
  Include,
  CreateInput,
  UpdateInput,
> {
  get(params: {
    where: WhereInput;
    select?: Select;
    include?: Include;
  }): Promise<T>;
  delete(params: { where: WhereInput }): Promise<void>;
  save(params: {
    data: CreateInput;
    select?: Select;
    include?: Include;
  }): Promise<T>;
  update(params: {
    where: WhereInput;
    data: UpdateInput;
    select?: Select;
    include?: Include;
  }): Promise<T>;
  getAll(params: { select?: Select; include?: Include }): Promise<T[]>;
}
