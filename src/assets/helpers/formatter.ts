export class Formatter {
  public static currency(value: number): string {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  public static duration(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    let result = '';

    if (hours > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0 || hours === 0) {
      result += `${minutes}m`;
    }

    return result.trim();
  }

  public static date(date: string | undefined): string {
    if (!date) {
      return '';
    }
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
  }

  public static rating(rating: number): number {
    return parseFloat((rating / 2).toFixed(1));
  }

  public static year(date: string | undefined): string {
    if (!date) {
      return '';
    }
    const newDate = new Date(date);
    return newDate.getFullYear().toString();
  }
}
