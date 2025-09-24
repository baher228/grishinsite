## Plan
- [x] `new_folder/src/payments/payments.controller.ts`
  - [x] Remove the `createIntent` endpoint method.
  - [x] Remove the unused import of `CreatePaymentIntentDto`.

- [x] `new_folder/src/payments/payments.service.ts`
  - [x] Remove the `createPaymentIntent` method.
  - [x] Remove the unused import for `CreatePaymentIntentDto`.
  - [x] **Bug Fix**: Correct the `unit_amount` in the `createCheckoutSession` method.

- [x] `new_folder/src/payments/webhook.controller.ts`
  - [x] Remove the `case` blocks for `payment_intent.succeeded` and `payment_intent.payment_failed`.

- [x] Delete `new_folder/src/payments/DTO/create-payment-intent.dto.ts`
