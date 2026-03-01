import { useEffect, useMemo, useState } from 'react'
import { cards as seedCards, transactions } from '../../../data'
import type { Card } from '../../../entities/finance/model/types'
import { useDemoState } from '../../../shared/lib/use-demo-state'
import { useOneTimeSkeleton } from '../../../shared/lib/use-one-time-skeleton'
import { StateMessage } from '../../../shared/ui/state-message'
import { CardDetailsDrawer } from '../components/card-details-drawer'
import { CardsSkeleton } from '../components/cards-skeleton'
import { CardTile } from '../components/card-tile'
import { getCardTransactions } from '../lib/card-operations'
import { getNextCardStatus } from '../lib/formatters'
import styles from './cards-page.module.scss'

export function CardsPage() {
  const demoState = useDemoState()
  const isInitialLoading = useOneTimeSkeleton('cards', 720)
  const [cards, setCards] = useState<Card[]>(seedCards)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isEditingLimit, setIsEditingLimit] = useState(false)
  const [limitDraft, setLimitDraft] = useState('')

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId) ?? null,
    [cards, selectedCardId],
  )

  const selectedOperations = useMemo(
    () => (selectedCard ? getCardTransactions(selectedCard.id, transactions, 6) : []),
    [selectedCard],
  )

  useEffect(() => {
    if (!isDrawerOpen) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousBodyPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false)
        setIsEditingLimit(false)
      }
    }

    window.addEventListener('keydown', onEscape)

    return () => {
      window.removeEventListener('keydown', onEscape)
      document.body.style.overflow = previousBodyOverflow
      document.body.style.paddingRight = previousBodyPaddingRight
    }
  }, [isDrawerOpen])

  const openDrawer = (cardId: string, editLimit = false) => {
    const card = cards.find((item) => item.id === cardId)
    if (!card) {
      return
    }

    setSelectedCardId(cardId)
    setLimitDraft(String(card.spendingLimit))
    setIsEditingLimit(editLimit)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setIsEditingLimit(false)
  }

  const updateCard = (cardId: string, updater: (card: Card) => Card) => {
    setCards((previous) =>
      previous.map((card) => (card.id === cardId ? updater(card) : card)),
    )
  }

  const handleToggleStatus = (cardId: string) => {
    updateCard(cardId, (card) => ({
      ...card,
      status: getNextCardStatus(card.status),
    }))
  }

  const handleSaveLimit = () => {
    if (!selectedCard) {
      return
    }

    const parsedLimit = Number(limitDraft)

    if (!Number.isFinite(parsedLimit) || parsedLimit < 0) {
      return
    }

    updateCard(selectedCard.id, (card) => ({
      ...card,
      spendingLimit: parsedLimit,
    }))
    setIsEditingLimit(false)
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Cards</h2>
        <p className={styles.meta}>Virtual and physical cards management</p>
      </header>

      {demoState === 'loading' || (demoState === 'ready' && isInitialLoading) ? (
        <CardsSkeleton />
      ) : demoState === 'error' ? (
        <StateMessage
          variant="error"
          title="Cards module failed"
          description="Mock error state: card controls are temporarily unavailable."
        />
      ) : demoState === 'empty' ? (
        <StateMessage
          variant="empty"
          title="No cards found"
          description="Mock empty state: add a card source to display virtual and physical cards."
        />
      ) : (
        <>
          <div className={styles.grid}>
            {cards.map((card) => (
              <CardTile
                key={card.id}
                card={card}
                onToggleStatus={handleToggleStatus}
                onChangeLimit={(cardId) => openDrawer(cardId, true)}
                onViewDetails={(cardId) => openDrawer(cardId, false)}
              />
            ))}
          </div>

          <CardDetailsDrawer
            isOpen={isDrawerOpen}
            card={selectedCard}
            operations={selectedOperations}
            limitDraft={limitDraft}
            isEditingLimit={isEditingLimit}
            onLimitDraftChange={setLimitDraft}
            onStartEditLimit={() => setIsEditingLimit(true)}
            onSaveLimit={handleSaveLimit}
            onCancelEditLimit={() => {
              setLimitDraft(selectedCard ? String(selectedCard.spendingLimit) : '')
              setIsEditingLimit(false)
            }}
            onToggleStatus={() => {
              if (selectedCard) {
                handleToggleStatus(selectedCard.id)
              }
            }}
            onClose={closeDrawer}
          />
        </>
      )}
    </section>
  )
}
