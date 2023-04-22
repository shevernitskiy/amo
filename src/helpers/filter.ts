export class Filter<
  TSimple extends string[] | never,
  TMulti extends string[] | never,
  TRange extends string[] | never,
  TStatus extends number | never,
  TCuctomField extends number | never,
> {
  private current: string[] = [];

  simple(key: TSimple[keyof TSimple], value: string | number): this {
    this.current.push(`filter[${key}]=${value}`);
    return this;
  }

  multi(key: TMulti[keyof TMulti], values: (string | number)[]): this {
    for (let i = 0; i < values.length; i++) {
      this.current.push(`filter[${key}][${i}]=${values[i]}`);
    }
    return this;
  }

  range(key: TRange[keyof TRange], from: number, to: number): this {
    this.current.push(`filter[${key}][from]=${from}&filter[${key}][to]=${to}`);
    return this;
  }

  statuses(pipeline_and_status: [TStatus, TStatus][]): this {
    for (let i = 0; i < pipeline_and_status.length; i++) {
      this.current.push(
        `filter[statuses][${i}][pipeline_id]=${pipeline_and_status[i][0]}&filter[statuses][${i}][status_id]=${
          pipeline_and_status[i][1]
        }`,
      );
    }
    return this;
  }

  custom_field(field_id: TCuctomField, value: string | number): this {
    this.current.push(`filter[custom_fields_values][${field_id}][]=${value}`);
    return this;
  }

  custom_field_range(field_id: TCuctomField, from: string | number, to: string | number): this {
    this.current.push(
      `filter[custom_fields_values][${field_id}][from]=${from}&filter[custom_fields_values][${field_id}][to]=${to}`,
    );
    return this;
  }

  toString(): string {
    return this.current.join("&");
  }
}

export type FilterLike<
  TSimple extends string[] | never,
  TMulti extends string[] | never,
  TRange extends string[] | never,
  TStatus extends number | never,
  TCuctomField extends number | never,
> =
  | Filter<TSimple, TMulti, TRange, TStatus, TCuctomField>
  | ((
    filter: Filter<TSimple, TMulti, TRange, TStatus, TCuctomField>,
  ) => Filter<TSimple, TMulti, TRange, TStatus, TCuctomField>);

export function filterLikeToString<
  TSimple extends string[] | never,
  TMulti extends string[] | never,
  TRange extends string[] | never,
  TStatus extends number | never,
  TCuctomField extends number | never,
>(filter_like: FilterLike<TSimple, TMulti, TRange, TStatus, TCuctomField>): string {
  if (filter_like instanceof Filter<TSimple, TMulti, TRange, TStatus, TCuctomField>) return filter_like.toString();
  return filter_like(new Filter()).toString();
}
