'use client';

import { useState, useRef, useTransition } from 'react';
import Image from 'next/image';
import {
  products,
  getPriceForSize,
  parsePrice,
  fmt,
  type Product,
} from './shop-data';
import { submitOrder } from './actions';

// ─── Types ───────────────────────────────────────────────────────────────────

type CartItem = {
  uid: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
};
type OrderForm = {
  name: string;
  email: string;
  phone: string;
  strasse: string;
  plz: string;
  ort: string;
  message: string;
};

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconChevronLeft() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function IconCart() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
function IconSpinner() {
  return (
    <span className="h-4 w-4 shrink-0 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
  );
}

// ─── ProductCard ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (productId: string, size: string, color: string, qty: number) => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);

  const allSizes = product.tiers.flatMap((t) => t.sizes);
  const hasSize = allSizes.length > 0;
  const hasColors = (product.colors?.length ?? 0) > 0;
  const canAdd = (!hasSize || size !== '') && (!hasColors || color !== '');
  const displayPrice = getPriceForSize(product, size);

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd(product.id, size, color, qty);
    setFlash(true);
    setTimeout(() => setFlash(false), 1400);
  };

  return (
    <article className="flex flex-col rounded-xl border border-zinc-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Image / Slider */}
      <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden group">
        <Image
          src={product.images[imgIndex]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
              disabled={imgIndex === 0}
              aria-label="Vorheriges Bild"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-25 transition-opacity"
            >
              <IconChevronLeft />
            </button>
            <button
              onClick={() => setImgIndex((i) => Math.min(product.images.length - 1, i + 1))}
              disabled={imgIndex === product.images.length - 1}
              aria-label="Nächstes Bild"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-25 transition-opacity"
            >
              <IconChevronRight />
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  aria-label={`Bild ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === imgIndex ? 'bg-white w-5' : 'bg-white/50 w-1.5 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h2 className="font-black text-zinc-900 tracking-tight">{product.name}</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{product.note}</p>
        </div>

        {/* Color selection */}
        {hasColors && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.colors!.map((c) => (
              <button
                key={c.name}
                title={c.name}
                onClick={() => setColor(c.name)}
                className={`h-6 w-6 rounded-full border-2 transition-all duration-150 ${
                  color === c.name
                    ? 'border-zinc-900 ring-2 ring-zinc-900 ring-offset-1 scale-110'
                    : 'border-zinc-200 hover:border-zinc-400'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {color && <span className="text-xs text-zinc-500 ml-1">{color}</span>}
          </div>
        )}

        {/* Size selection */}
        {hasSize && (
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border border-zinc-200 bg-white text-sm text-zinc-700 px-3 py-2 focus:outline-none focus:border-zinc-900 rounded transition-colors"
          >
            <option value="">Größe wählen …</option>
            {allSizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        {/* Price tiers */}
        <div className="space-y-1 border-t border-zinc-100 pt-2.5">
          {product.tiers.map((tier) => (
            <div key={tier.label} className="flex justify-between items-baseline">
              <span className="text-zinc-400 text-xs">{tier.label}</span>
              <span
                className={`font-bold text-sm transition-colors ${
                  displayPrice === tier.price ? 'text-red-600' : 'text-zinc-700'
                }`}
              >
                {tier.price}
              </span>
            </div>
          ))}
        </div>

        {/* Qty + Add */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <div className="flex items-center border border-zinc-200 rounded overflow-hidden shrink-0">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-2.5 py-1.5 text-zinc-500 hover:bg-zinc-100 transition-colors leading-none"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-bold text-zinc-900">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="px-2.5 py-1.5 text-zinc-500 hover:bg-zinc-100 transition-colors leading-none"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className={`flex-1 py-2 text-xs font-bold rounded tracking-wide transition-all duration-200 ${
              flash
                ? 'bg-green-600 text-white'
                : canAdd
                ? 'bg-zinc-900 hover:bg-red-600 text-white'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
            }`}
          >
            {flash ? '✓ Hinzugefügt' : 'In den Warenkorb'}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── CartPanel ────────────────────────────────────────────────────────────────

function CartPanel({
  cart,
  form,
  onRemove,
  onQtyChange,
  onFormChange,
  onSubmit,
  submitted,
  pending,
  error,
  onReset,
}: {
  cart: CartItem[];
  form: OrderForm;
  onRemove: (uid: string) => void;
  onQtyChange: (uid: string, qty: number) => void;
  onFormChange: (field: keyof OrderForm, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitted: boolean;
  pending: boolean;
  error: string | null;
  onReset: () => void;
}) {
  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)!;
    const price = getPriceForSize(product, item.size);
    return sum + (price ? parsePrice(price) * item.quantity : 0);
  }, 0);

  const totalCount = cart.reduce((s, i) => s + i.quantity, 0);

  const inp =
    'w-full border border-zinc-200 text-sm px-3 py-2 focus:outline-none focus:border-zinc-900 transition-colors rounded text-zinc-800 placeholder-zinc-400 bg-white';
  const lbl =
    'block text-[10px] font-bold tracking-[0.12em] uppercase text-zinc-500 mb-1';

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-zinc-50 border-b border-zinc-100 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-700">
          <IconCart />
          <h2 className="font-black text-sm text-zinc-900">Warenkorb</h2>
        </div>
        {totalCount > 0 && (
          <span className="flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {totalCount}
          </span>
        )}
      </div>

      {submitted ? (
        <div className="p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-3">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-bold text-zinc-900 mb-1">Bestellung gesendet</p>
          <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
            Vielen Dank! Deine Bestellung ist bei uns eingegangen. Wir melden uns
            schnellstmöglich per E-Mail bei dir.
          </p>
          <button
            onClick={onReset}
            className="text-xs font-bold text-red-600 hover:text-red-700 underline"
          >
            Neue Bestellung aufgeben
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {/* Cart items */}
          <div className="px-5 py-4">
            {cart.length === 0 ? (
              <p className="text-xs text-zinc-400 text-center py-6 leading-relaxed">
                Noch keine Artikel.
                <br />
                Wähle ein Produkt links aus.
              </p>
            ) : (
              <div className="space-y-0 max-h-56 overflow-y-auto">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.productId)!;
                  const price = getPriceForSize(product, item.size);
                  const lineTotal = price ? parsePrice(price) * item.quantity : 0;
                  const swatch = product.colors?.find((c) => c.name === item.color);

                  return (
                    <div
                      key={item.uid}
                      className="flex gap-2 items-start py-2.5 border-b border-zinc-100 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-900 leading-snug">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          {item.size && (
                            <span className="text-xs text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                              Gr. {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="flex items-center gap-1 text-xs text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                              {swatch && (
                                <span
                                  className="h-2.5 w-2.5 rounded-full inline-block border border-zinc-200 shrink-0"
                                  style={{ backgroundColor: swatch.hex }}
                                />
                              )}
                              {item.color}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-red-600 mt-1">
                          {lineTotal > 0 ? fmt(lineTotal) : price ?? ''}
                        </p>
                      </div>
                      {/* Qty controls */}
                      <div className="flex items-center border border-zinc-200 rounded text-xs overflow-hidden shrink-0">
                        <button
                          type="button"
                          onClick={() => onQtyChange(item.uid, Math.max(1, item.quantity - 1))}
                          className="px-1.5 py-1 text-zinc-500 hover:bg-zinc-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onQtyChange(item.uid, item.quantity + 1)}
                          className="px-1.5 py-1 text-zinc-500 hover:bg-zinc-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => onRemove(item.uid)}
                        aria-label="Entfernen"
                        className="p-1 mt-0.5 text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <IconClose />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Total */}
          {cart.length > 0 && (
            <div className="mx-5 mb-4 border border-zinc-100 rounded-lg bg-zinc-50 px-4 py-2.5 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">Gesamt</span>
              <span className="font-black text-zinc-900">{fmt(total)}</span>
            </div>
          )}

          {/* Contact */}
          <div className="px-5 pb-4 space-y-2.5">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px flex-1 bg-zinc-100" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                Kontakt & Lieferadresse
              </span>
              <span className="h-px flex-1 bg-zinc-100" />
            </div>
            <div>
              <label className={lbl}>Name *</label>
              <input
                type="text"
                required
                placeholder="Vor- und Nachname"
                value={form.name}
                onChange={(e) => onFormChange('name', e.target.value)}
                className={inp}
              />
            </div>
            <div>
              <label className={lbl}>Straße & Hausnummer *</label>
              <input
                type="text"
                required
                placeholder="Musterstraße 12"
                value={form.strasse}
                onChange={(e) => onFormChange('strasse', e.target.value)}
                className={inp}
              />
            </div>
            <div className="flex gap-2.5">
              <div className="w-24 shrink-0">
                <label className={lbl}>PLZ *</label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="\d{4,5}"
                  placeholder="13187"
                  value={form.plz}
                  onChange={(e) => onFormChange('plz', e.target.value)}
                  className={inp}
                />
              </div>
              <div className="flex-1 min-w-0">
                <label className={lbl}>Ort *</label>
                <input
                  type="text"
                  required
                  placeholder="Berlin"
                  value={form.ort}
                  onChange={(e) => onFormChange('ort', e.target.value)}
                  className={inp}
                />
              </div>
            </div>
            <div>
              <label className={lbl}>E-Mail *</label>
              <input
                type="email"
                required
                placeholder="deine@email.de"
                value={form.email}
                onChange={(e) => onFormChange('email', e.target.value)}
                className={inp}
              />
            </div>
            <div>
              <label className={lbl}>Telefon *</label>
              <input
                type="tel"
                required
                placeholder="+49 …"
                value={form.phone}
                onChange={(e) => onFormChange('phone', e.target.value)}
                className={inp}
              />
            </div>
            <div>
              <label className={lbl}>
                Anmerkungen{' '}
                <span className="font-normal normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Besondere Wünsche …"
                value={form.message}
                onChange={(e) => onFormChange('message', e.target.value)}
                className={`${inp} resize-none`}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
              <p className="text-xs font-semibold text-red-700">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="px-5 pb-5">
            <button
              type="submit"
              disabled={cart.length === 0 || pending}
              className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-bold py-3 text-xs tracking-widest uppercase rounded transition-colors duration-200"
            >
              {pending ? (
                <>
                  <IconSpinner />
                  Wird gesendet …
                </>
              ) : (
                'Bestellung absenden'
              )}
            </button>
            {cart.length === 0 && (
              <p className="text-[11px] text-zinc-400 text-center mt-1.5">
                Zuerst Artikel hinzufügen.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

const EMPTY_FORM: OrderForm = {
  name: '',
  email: '',
  phone: '',
  strasse: '',
  plz: '',
  ort: '',
  message: '',
};

export default function ShopClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<OrderForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const uidRef = useRef(0);

  const addToCart = (productId: string, size: string, color: string, qty: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map((i) =>
          i.uid === existing.uid ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        { uid: String(uidRef.current++), productId, size, color, quantity: qty },
      ];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setError(null);

    startTransition(async () => {
      const result = await submitOrder({
        items: cart.map(({ productId, size, color, quantity }) => ({
          productId,
          size,
          color,
          quantity,
        })),
        address: form,
      });
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error ?? 'Unbekannter Fehler. Bitte versuche es erneut.');
      }
    });
  };

  const reset = () => {
    setCart([]);
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setError(null);
  };

  return (
    <section className="bg-zinc-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          {/* ── Products grid ── */}
          <div className="flex-1 min-w-0">
            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          </div>

          {/* ── Sticky cart ── */}
          <div className="w-full lg:w-[340px] shrink-0 self-start lg:sticky lg:top-24">
            <CartPanel
              cart={cart}
              form={form}
              onRemove={(uid) => setCart((prev) => prev.filter((i) => i.uid !== uid))}
              onQtyChange={(uid, qty) =>
                setCart((prev) =>
                  prev.map((i) => (i.uid === uid ? { ...i, quantity: qty } : i))
                )
              }
              onFormChange={(field, value) =>
                setForm((prev) => ({ ...prev, [field]: value }))
              }
              onSubmit={handleSubmit}
              submitted={submitted}
              pending={pending}
              error={error}
              onReset={reset}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
